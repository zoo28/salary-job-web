import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, BookOpen, TrendingUp, Zap, Clock, Award, ChevronRight, Star, Rocket } from 'lucide-react';
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
  TabsContent,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MOCK_SKILLS, type ISkill } from '@/data/skillsdata';
import { cn } from '@/lib/utils';

const LEARN_TIME_OPTIONS = [
  { value: '1', label: '1 个月' },
  { value: '3', label: '3 个月' },
  { value: '6', label: '6 个月' },
];

const TARGET_RAISE_OPTIONS = [
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30%' },
  { value: '50', label: '50%' },
];

interface LearningPathItem {
  skill: ISkill;
  roi: number;
  phase: '基础期' | '进阶期' | '冲刺期';
}

function SkillPlannerSection() {
  const [jobDirection, setJobDirection] = useState<'bigdata' | 'it'>('bigdata');
  const [learnTime, setLearnTime] = useState('3');
  const [targetRaise, setTargetRaise] = useState('20');
  const [currentSkills, setCurrentSkills] = useState<string[]>(['python', 'sql']);
  const [showResult, setShowResult] = useState(false);

  // 过滤出适合当前方向的未掌握技能
  const availableSkills = useMemo(() => {
    return MOCK_SKILLS.filter(
      (s) =>
        (s.jobDirection === jobDirection || s.jobDirection === 'both') &&
        !currentSkills.includes(s.id)
    );
  }, [jobDirection, currentSkills]);

  // 按 ROI 排序（薪资溢价 / 学习月数）
  const rankedSkills = useMemo(() => {
    return [...availableSkills]
      .map((s) => ({
        skill: s,
        roi: s.salaryPremium / s.learnMonths,
      }))
      .sort((a, b) => b.roi - a.roi);
  }, [availableSkills]);

  // 生成学习路径
  const learningPath = useMemo((): LearningPathItem[] => {
    const months = parseInt(learnTime);
    const path: LearningPathItem[] = [];
    let totalMonths = 0;

    for (const item of rankedSkills) {
      if (totalMonths + item.skill.learnMonths <= months) {
        let phase: LearningPathItem['phase'] = '基础期';
        const ratio = totalMonths / months;
        if (ratio < 0.33) phase = '基础期';
        else if (ratio < 0.66) phase = '进阶期';
        else phase = '冲刺期';

        path.push({ ...item, phase });
        totalMonths += item.skill.learnMonths;
      }
      if (totalMonths >= months) break;
    }

    return path;
  }, [rankedSkills, learnTime]);

  // 预计总薪资提升
  const totalPremium = useMemo(() => {
    return learningPath.reduce((acc, item) => acc + item.skill.salaryPremium, 0);
  }, [learningPath]);

  const toggleCurrentSkill = (skillId: string) => {
    setCurrentSkills((prev) =>
      prev.includes(skillId) ? prev.filter((s) => s !== skillId) : [...prev, skillId]
    );
  };

  const handleGenerate = () => {
    setShowResult(false);
    setTimeout(() => setShowResult(true), 100);
  };

  // 技能溢价排行榜（全量）
  const premiumRanking = useMemo(() => {
    return MOCK_SKILLS.filter(
      (s) => s.jobDirection === jobDirection || s.jobDirection === 'both'
    )
      .sort((a, b) => b.salaryPremium - a.salaryPremium)
      .slice(0, 8);
  }, [jobDirection]);

  const maxPremium = premiumRanking[0]?.salaryPremium || 1;

  const phaseColor: Record<LearningPathItem['phase'], string> = {
    基础期: 'bg-info/15 text-info border-info/30',
    进阶期: 'bg-primary/15 text-primary border-primary/30',
    冲刺期: 'bg-accent/15 text-accent border-accent/30',
  };

  const difficultyStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'size-3',
          i < level ? 'fill-warning text-warning' : 'text-muted-foreground/30'
        )}
      />
    ));
  };

  return (
    <section id="skill-planner" className="w-full py-16 md:py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 border-accent/30 text-accent bg-accent/5">
            <Rocket className="size-3.5 mr-1.5" />
            技能提升规划
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              找到最适合你的
            </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {' '}学习路径
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            基于你当前技能栈和目标薪资涨幅，智能推荐最优学习顺序，最大化投入产出比
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：输入配置 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="size-5 text-primary" />
                  目标配置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">岗位方向</label>
                  <Tabs
                    value={jobDirection}
                    onValueChange={(v) => setJobDirection(v as 'bigdata' | 'it')}
                  >
                    <TabsList className="grid grid-cols-2 w-full h-10">
                      <TabsTrigger value="bigdata" className="text-sm">大数据</TabsTrigger>
                      <TabsTrigger value="it" className="text-sm">IT</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    可用学习时间
                  </label>
                  <Select value={learnTime} onValueChange={setLearnTime}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEARN_TIME_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="size-4 text-muted-foreground" />
                    目标薪资涨幅
                  </label>
                  <Select value={targetRaise} onValueChange={setTargetRaise}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TARGET_RAISE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <BookOpen className="size-4 text-muted-foreground" />
                      当前已掌握技能
                    </label>
                    <span className="text-xs text-muted-foreground">{currentSkills.length} 项</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-3 rounded-lg bg-muted/30 border border-border/30 max-h-[160px] overflow-y-auto">
                    {MOCK_SKILLS.filter(
                      (s) => s.jobDirection === jobDirection || s.jobDirection === 'both'
                    ).map((skill) => {
                      const selected = currentSkills.includes(skill.id);
                      return (
                        <button
                          key={skill.id}
                          type="button"
                          onClick={() => toggleCurrentSkill(skill.id)}
                          className={cn(
                            'px-2.5 py-1 rounded text-xs font-medium transition-all border',
                            selected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground'
                          )}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  className="w-full h-11 shadow-lg shadow-primary/20"
                  onClick={handleGenerate}
                >
                  <Zap className="size-4 mr-2" />
                  生成学习计划
                </Button>
              </CardContent>
            </Card>

            {/* 预计提升概览 */}
            <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">预计薪资提升</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums">
                      +{(totalPremium / 1000).toFixed(1)}
                    </span>
                    <span className="text-lg font-semibold text-muted-foreground">K/月</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    完成 {learningPath.length} 项技能学习后预计可达
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 右侧：学习路径 + 排行榜 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="size-5 text-primary" />
                  优先学习清单
                  <span className="text-xs font-normal text-muted-foreground ml-2">
                    按投入产出比排序
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {!showResult || learningPath.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="size-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                        <BookOpen className="size-8 text-accent/60" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        配置目标后点击「生成学习计划」查看推荐
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      {learningPath.map((item, i) => (
                        <motion.div
                          key={item.skill.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="p-4 rounded-xl border border-border/40 bg-background/50 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="size-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold shrink-0">
                                {i + 1}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-foreground">
                                    {item.skill.name}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className={cn('text-xs font-normal', phaseColor[item.phase])}
                                  >
                                    {item.phase}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {item.skill.learnMonths} 个月
                                  </span>
                                  <span className="flex items-center gap-1">
                                    难度 {difficultyStars(item.skill.difficulty)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-lg font-bold text-success tabular-nums">
                                +{(item.skill.salaryPremium / 1000).toFixed(1)}K
                              </p>
                              <p className="text-xs text-muted-foreground">薪资溢价</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>ROI 指数</span>
                              <span className="font-medium text-primary">
                                {item.roi.toFixed(0)}
                              </span>
                            </div>
                            <Progress value={(item.roi / 4500) * 100} className="h-1.5" />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* 技能薪资溢价排行榜 */}
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="size-5 text-accent" />
                  技能薪资溢价排行榜
                </CardTitle>
                <CardDescription>全行业技能薪资溢价 TOP 8</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {premiumRanking.map((skill, i) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 group"
                    >
                      <span
                        className={cn(
                          'size-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0',
                          i === 0
                            ? 'bg-gradient-to-br from-warning to-warning/70 text-warning-foreground'
                            : i === 1
                            ? 'bg-muted text-muted-foreground'
                            : i === 2
                            ? 'bg-muted/60 text-muted-foreground'
                            : 'bg-muted/30 text-muted-foreground/70'
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium w-24 shrink-0">{skill.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.salaryPremium / maxPremium) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground tabular-nums w-16 text-right">
                        +{skill.salaryPremium}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(SkillPlannerSection);
