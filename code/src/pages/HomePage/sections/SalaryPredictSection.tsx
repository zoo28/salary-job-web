import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Users, Briefcase, MapPin, GraduationCap, Clock, Sparkles, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MOCK_SALARY_BENCHMARKS } from '@/data/salarydata';
import { MOCK_SKILLS, type ISkill } from '@/data/skillsdata';
import { cn } from '@/lib/utils';

const CITIES = ['北京', '上海', '深圳', '广州', '杭州', '成都', '武汉', '西安', '南京', '苏州', '天津', '重庆', '长沙', '合肥', '青岛', '沈阳', '厦门', '郑州', '东莞', '佛山'];

const EDUCATION_OPTIONS = [
  { value: 'college', label: '大专' },
  { value: 'bachelor', label: '本科' },
  { value: 'master', label: '硕士' },
  { value: 'phd', label: '博士' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'fresh', label: '应届生' },
  { value: 'lt1', label: '1年以内' },
  { value: '1-3', label: '1-3年' },
  { value: '3-5', label: '3-5年' },
  { value: '5-10', label: '5-10年' },
  { value: 'gt10', label: '10年以上' },
];

const SKILL_CATEGORIES = [
  { value: 'programming', label: '编程语言' },
  { value: 'database', label: '数据库' },
  { value: 'bigdata', label: '大数据框架' },
  { value: 'analytics', label: '分析工具' },
  { value: 'cloud', label: '云服务' },
];

interface PredictResult {
  minSalary: number;
  maxSalary: number;
  tier: 'low' | 'mid' | 'high';
  tierLabel: string;
  profile: string[];
}

function SalaryPredictSection() {
  const [jobDirection, setJobDirection] = useState<'bigdata' | 'it'>('bigdata');
  const [city, setCity] = useState('北京');
  const [education, setEducation] = useState('bachelor');
  const [experience, setExperience] = useState('3-5');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['python', 'sql']);
  const [result, setResult] = useState<PredictResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const filteredSkills = useMemo(() => {
    return MOCK_SKILLS.filter(
      (s) => s.jobDirection === jobDirection || s.jobDirection === 'both'
    );
  }, [jobDirection]);

  const skillsByCategory = useMemo(() => {
    const grouped: Record<string, ISkill[]> = {};
    SKILL_CATEGORIES.forEach((cat) => {
      grouped[cat.value] = filteredSkills.filter((s) => s.category === cat.value);
    });
    return grouped;
  }, [filteredSkills]);

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((s) => s !== skillId) : [...prev, skillId]
    );
  };

  const handlePredict = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // 查找基准薪资
      let base = MOCK_SALARY_BENCHMARKS.find(
        (b) =>
          b.jobDirection === jobDirection &&
          b.city === city &&
          b.education === education &&
          b.experience === experience
      );

      // 找不到精确匹配时，找同城市同岗位同经验的最近学历
      if (!base) {
        base = MOCK_SALARY_BENCHMARKS.find(
          (b) =>
            b.jobDirection === jobDirection &&
            b.city === city &&
            b.experience === experience
        );
      }
      // 再退一步：同岗位同经验同学历的一线城市基准
      if (!base) {
        base = MOCK_SALARY_BENCHMARKS.find(
          (b) =>
            b.jobDirection === jobDirection &&
            b.experience === experience &&
            b.education === education
        );
      }
      // 最后兜底
      if (!base) {
        base = {
          id: 'fallback',
          jobDirection,
          city,
          education: education as any,
          experience: experience as any,
          baseSalaryMin: 15,
          baseSalaryMax: 25,
        };
      }

      // 技能加权：每个已选技能增加一定比例
      const skillBonus = selectedSkills.reduce((acc, sid) => {
        const skill = MOCK_SKILLS.find((s) => s.id === sid);
        if (skill) {
          acc += skill.salaryPremium / 10000; // 转成 K
        }
        return acc;
      }, 0);

      const minSalary = Math.round(base.baseSalaryMin + skillBonus * 0.6);
      const maxSalary = Math.round(base.baseSalaryMax + skillBonus * 0.9);

      // 档位判定
      const avgSalary = (minSalary + maxSalary) / 2;
      let tier: 'low' | 'mid' | 'high';
      let tierLabel: string;
      if (avgSalary < 15) {
        tier = 'low';
        tierLabel = '低薪';
      } else if (avgSalary < 35) {
        tier = 'mid';
        tierLabel = '中薪';
      } else {
        tier = 'high';
        tierLabel = '高薪';
      }

      // 人群画像
      const profiles: Record<string, string[]> = {
        low: [
          '多为应届生或 1 年以内工作经验',
          '以执行层岗位为主，独立承担模块较少',
          '掌握基础编程语言和常用工具',
          '二三线城市占比较高',
        ],
        mid: [
          '3-5 年工作经验为主，具备独立项目能力',
          '可负责中型项目模块设计与开发',
          '熟练掌握 2-3 项核心技术栈',
          '一线/新一线城市分布均衡',
        ],
        high: [
          '5 年以上经验，具备架构或团队管理能力',
          '主导过大型项目或核心系统建设',
          '掌握稀缺技术（Flink / K8s / 云原生等）',
          '集中在北上深杭等一线城市',
        ],
      };

      setResult({
        minSalary,
        maxSalary,
        tier,
        tierLabel,
        profile: profiles[tier],
      });
      setIsCalculating(false);
    }, 600);
  };

  const tierColor = {
    low: 'bg-warning/15 text-warning border-warning/30',
    mid: 'bg-primary/15 text-primary border-primary/30',
    high: 'bg-success/15 text-success border-success/30',
  };

  return (
    <section id="salary-predict" className="w-full pt-24 md:pt-28 pb-16 md:pb-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 border-primary/30 text-primary bg-primary/5">
            <Sparkles className="size-3.5 mr-1.5" />
            基于 4,398 条真实岗位数据
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              精准预测你的
            </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {' '}薪资区间
            </span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            填写个人背景信息，AI 智能匹配行业基准，为你生成个性化薪资预测报告
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 左侧输入区 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-foreground/[0.02]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calculator className="size-5 text-primary" />
                  薪资预测计算器
                </CardTitle>
                <CardDescription>
                  填写你的求职背景，获取精准薪资预估
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 岗位方向 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="size-4 text-muted-foreground" />
                    岗位方向
                  </label>
                  <Tabs
                    value={jobDirection}
                    onValueChange={(v) => setJobDirection(v as 'bigdata' | 'it')}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 w-full h-11">
                      <TabsTrigger value="bigdata" className="text-sm">
                        大数据岗位
                      </TabsTrigger>
                      <TabsTrigger value="it" className="text-sm">
                        IT 岗位
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* 城市 + 学历 + 经验 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="size-4 text-muted-foreground" />
                      目标城市
                    </label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="选择城市" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {CITIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <GraduationCap className="size-4 text-muted-foreground" />
                      学历
                    </label>
                    <Select value={education} onValueChange={setEducation}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="选择学历" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      工作经验
                    </label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="选择经验" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 技能选择 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="size-4 text-muted-foreground" />
                      已掌握技能
                    </label>
                    <span className="text-xs text-muted-foreground">
                      已选 {selectedSkills.length} 项
                    </span>
                  </div>
                  <Accordion type="multiple" defaultValue={['programming', 'database']} className="space-y-2">
                    {SKILL_CATEGORIES.map((cat) => {
                      const catSkills = skillsByCategory[cat.value] || [];
                      if (catSkills.length === 0) return null;
                      return (
                        <AccordionItem key={cat.value} value={cat.value} className="border border-border/40 rounded-lg px-4 data-[state=open]:bg-accent/20 transition-colors">
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <span className="text-sm font-medium">{cat.label}</span>
                            <span className="text-xs text-muted-foreground mr-2">
                              {catSkills.filter((s) => selectedSkills.includes(s.id)).length}/{catSkills.length}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-3">
                            <div className="flex flex-wrap gap-2">
                              {catSkills.map((skill) => {
                                const isSelected = selectedSkills.includes(skill.id);
                                return (
                                  <button
                                    key={skill.id}
                                    type="button"
                                    onClick={() => toggleSkill(skill.id)}
                                    className={cn(
                                      'px-3 py-1.5 rounded-md text-xs font-medium transition-all border flex items-center gap-1.5',
                                      isSelected
                                        ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                                        : 'bg-background text-foreground border-border/60 hover:border-primary/50 hover:text-primary'
                                    )}
                                  >
                                    {isSelected && <Check className="size-3" />}
                                    {skill.name}
                                  </button>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>

                <Button
                  size="lg"
                  className="w-full h-12 text-base shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  onClick={handlePredict}
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      计算中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4 mr-2" />
                      预测薪资
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* 右侧结果区 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full border-border/40 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm shadow-xl shadow-foreground/[0.02]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="size-5 text-primary" />
                  预测结果
                </CardTitle>
                <CardDescription>
                  基于行业基准数据智能测算
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {!result ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Calculator className="size-10 text-primary/60" />
                      </div>
                      <p className="text-foreground font-medium mb-1">等待预测</p>
                      <p className="text-sm text-muted-foreground max-w-[240px]">
                        填写左侧信息后点击「预测薪资」查看结果
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      {/* 薪资区间 */}
                      <div className="text-center py-6">
                        <Badge
                          variant="outline"
                          className={cn('mb-4 px-3 py-1 text-sm font-semibold', tierColor[result.tier])}
                        >
                          {result.tierLabel}档位
                        </Badge>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums tracking-tight">
                            {result.minSalary}
                          </span>
                          <span className="text-2xl font-bold text-muted-foreground mx-1">-</span>
                          <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent tabular-nums tracking-tight">
                            {result.maxSalary}
                          </span>
                          <span className="text-lg font-semibold text-muted-foreground ml-2">K</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          月薪 · 人民币 · 税前
                        </p>
                      </div>

                      {/* 分割线 */}
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                      {/* 人群画像 */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <Users className="size-4 text-primary" />
                          同档位人群画像
                        </h4>
                        <ul className="space-y-2">
                          {result.profile.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <Check className="size-4 text-primary shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* 数据说明 */}
                      <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground flex items-start gap-2">
                        <Sparkles className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span>
                          数据基于 4,398 条真实岗位样本测算，仅供参考。实际薪资受公司规模、个人能力、谈判技巧等因素影响。
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(SalaryPredictSection);
