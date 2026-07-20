import { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, SlidersHorizontal, TrendingUp, DollarSign, Building2, Leaf, Scale, Award, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { MOCK_CITY_DATA, type ICityData } from '@/data/citydata';
import { cn } from '@/lib/utils';

const JOB_TYPES = [
  { id: 'dev', name: '数据开发岗', demand: 95, growth: 90, avgSalary: 28, barrier: 75 },
  { id: 'analysis', name: '数据分析岗', demand: 85, growth: 88, avgSalary: 22, barrier: 55 },
  { id: 'governance', name: '数据治理岗', demand: 60, growth: 82, avgSalary: 25, barrier: 70 },
  { id: 'product', name: '产品/销售岗', demand: 70, growth: 75, avgSalary: 24, barrier: 50 },
  { id: 'manage', name: '管理岗', demand: 40, growth: 65, avgSalary: 45, barrier: 90 },
];

interface WeightConfig {
  salary: number;
  demand: number;
  growth: number;
  cost: number;
}

function DecisionHelperSection() {
  const [weights, setWeights] = useState<WeightConfig>({
    salary: 35,
    demand: 25,
    growth: 25,
    cost: 15,
  });
  const [jobDirection, setJobDirection] = useState<'bigdata' | 'it'>('bigdata');

  // 归一化权重到 100
  const normalizedWeights = useMemo(() => {
    const total = weights.salary + weights.demand + weights.growth + weights.cost;
    return {
      salary: (weights.salary / total) * 100,
      demand: (weights.demand / total) * 100,
      growth: (weights.growth / total) * 100,
      cost: (weights.cost / total) * 100,
    };
  }, [weights]);

  // 计算城市综合得分
  const cityRankings = useMemo(() => {
    return MOCK_CITY_DATA.map((city) => {
      const salaryScore = (city.avgSalary / 30) * 100;
      const demandScore = city.jobDemand;
      const growthScore = city.growthIndex;
      const costScore = 100 - city.costOfLiving; // 生活成本越低分越高

      const totalScore =
        (salaryScore * normalizedWeights.salary +
          demandScore * normalizedWeights.demand +
          growthScore * normalizedWeights.growth +
          costScore * normalizedWeights.cost) /
        100;

      return {
        ...city,
        score: Math.round(totalScore * 10) / 10,
        salaryScore: Math.round(salaryScore),
        demandScore,
        growthScore,
        costScore: Math.round(costScore),
      };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [normalizedWeights]);

  // 计算岗位综合得分
  const jobRankings = useMemo(() => {
    return JOB_TYPES.map((job) => {
      const salaryScore = (job.avgSalary / 50) * 100;
      const demandScore = job.demand;
      const growthScore = job.growth;
      const costScore = 100 - job.barrier; // 门槛越低分越高

      const totalScore =
        (salaryScore * normalizedWeights.salary +
          demandScore * normalizedWeights.demand +
          growthScore * normalizedWeights.growth +
          costScore * normalizedWeights.cost) /
        100;

      return {
        ...job,
        score: Math.round(totalScore * 10) / 10,
      };
    }).sort((a, b) => b.score - a.score);
  }, [normalizedWeights]);

  const top3 = cityRankings.slice(0, 3);

  const weightItems = [
    { key: 'salary' as const, label: '薪资水平', icon: DollarSign, color: 'text-primary' },
    { key: 'demand' as const, label: '岗位需求量', icon: Briefcase, color: 'text-success' },
    { key: 'growth' as const, label: '成长空间', icon: TrendingUp, color: 'text-accent' },
    { key: 'cost' as const, label: '生活成本', icon: Leaf, color: 'text-warning' },
  ];

  return (
    <section id="decision-helper" className="w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 border-success/30 text-success bg-success/5">
            <Scale className="size-3.5 mr-1.5" />
            多维度决策
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              找到最适合你的
            </span>
            <span className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              {' '}城市与赛道
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            调整偏好权重，系统为你智能匹配最优求职方向，告别选择困难
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧：权重配置 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <SlidersHorizontal className="size-5 text-primary" />
                  偏好权重配置
                </CardTitle>
                <CardDescription>拖动滑块调整各维度重要程度</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {weightItems.map((item) => (
                  <div key={item.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className={cn('size-4', item.color)} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-primary">
                        {Math.round(normalizedWeights[item.key])}%
                      </span>
                    </div>
                    <Slider
                      value={[weights[item.key]]}
                      onValueChange={(v) =>
                        setWeights((prev) => ({ ...prev, [item.key]: v[0] }))
                      }
                      min={5}
                      max={50}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>
                ))}

                <div className="pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">权重合计</span>
                    <span className="font-semibold text-foreground">
                      {Math.round(
                        normalizedWeights.salary +
                          normalizedWeights.demand +
                          normalizedWeights.growth +
                          normalizedWeights.cost
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 右侧：城市排名 + 岗位推荐 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* 城市综合排名 */}
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  城市综合排名 TOP 5
                </CardTitle>
                <CardDescription>根据你的偏好权重计算综合得分</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {cityRankings.map((city, i) => (
                    <motion.div
                      key={city.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        'p-4 rounded-xl border transition-all hover:-translate-y-1',
                        i === 0
                          ? 'bg-gradient-to-br from-primary/15 to-accent/10 border-primary/30 shadow-lg shadow-primary/10'
                          : 'bg-background/50 border-border/40 hover:border-primary/30'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={cn(
                            'size-7 rounded-full flex items-center justify-center text-xs font-bold',
                            i === 0
                              ? 'bg-primary text-primary-foreground'
                              : i === 1
                              ? 'bg-muted text-foreground'
                              : 'bg-muted/60 text-muted-foreground'
                          )}
                        >
                          {i + 1}
                        </span>
                        {i === 0 && <Award className="size-4 text-warning fill-warning" />}
                      </div>
                      <h4 className="font-bold text-lg mb-1">{city.name}</h4>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums">
                          {city.score}
                        </span>
                        <span className="text-xs text-muted-foreground">分</span>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>平均薪资</span>
                          <span className="font-medium text-foreground">{city.avgSalary}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span>岗位需求</span>
                          <span className="font-medium text-foreground">{city.jobDemand}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 岗位赛道推荐 + 优劣势对比 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 岗位赛道 */}
              <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="size-5 text-accent" />
                    岗位赛道推荐
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {jobRankings.map((job, i) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/40 hover:border-accent/30 transition-colors"
                      >
                        <span
                          className={cn(
                            'size-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0',
                            i === 0
                              ? 'bg-gradient-to-br from-accent to-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{job.name}</p>
                        </div>
                        <span className="text-sm font-bold text-accent tabular-nums shrink-0">
                          {job.score} 分
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* TOP3 优劣势对比 */}
              <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Scale className="size-5 text-success" />
                    TOP3 城市优劣势
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {top3.map((city, i) => (
                    <div key={city.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{city.name}</span>
                        <Badge variant="outline" className="text-xs h-5">
                          综合 {city.score} 分
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-md bg-success/5 border border-success/20">
                          <div className="flex items-center gap-1 text-success font-medium mb-1">
                            <ThumbsUp className="size-3" />
                            优势
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {city.growthIndex > 85
                              ? '成长空间大，发展前景好'
                              : city.jobDemand > 80
                              ? '岗位需求旺盛，机会多'
                              : city.costOfLiving < 50
                              ? '生活成本低，性价比高'
                              : '薪资水平高，收入可观'}
                          </p>
                        </div>
                        <div className="p-2 rounded-md bg-destructive/5 border border-destructive/20">
                          <div className="flex items-center gap-1 text-destructive font-medium mb-1">
                            <ThumbsDown className="size-3" />
                            劣势
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {city.costOfLiving > 80
                              ? '生活成本高，压力较大'
                              : city.jobDemand < 60
                              ? '岗位机会相对较少'
                              : city.growthIndex < 70
                              ? '发展增速相对平缓'
                              : '竞争激烈，门槛较高'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(DecisionHelperSection);
