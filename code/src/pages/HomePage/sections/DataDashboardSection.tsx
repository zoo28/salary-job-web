import { memo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { BarChart3, TrendingUp, Brain, Award, PieChart, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_DASHBOARD_DATA } from '@/data/dashboarddata';
import { CHART_PALETTE } from '@/lib/chart-colors';

const dashboard = MOCK_DASHBOARD_DATA[0];

function DataDashboardSection() {
  // 城市薪资排行 - 横向柱状图
  const cityBarOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const list = Array.isArray(params) ? params : [params];
        return `${list[0].name}<br/>平均薪资: ${list[0].value}K`;
      },
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}K' },
      splitLine: { lineStyle: { opacity: 0.3 } },
    },
    yAxis: {
      type: 'category',
      data: [...dashboard.citySalaryRank].reverse().map((d) => d.city),
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: [...dashboard.citySalaryRank].reverse().map((d) => d.avgSalary),
        barWidth: 16,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: CHART_PALETTE[0] },
              { offset: 1, color: CHART_PALETTE[1] },
            ],
          },
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => `${params.value}K`,
        },
      },
    ],
  };

  // 工作经验薪资增长趋势 - 折线图
  const trendLineOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const list = Array.isArray(params) ? params : [params];
        let html = `${list[0].name}<br/>`;
        list.forEach((p) => {
          html += `${p.marker} ${p.seriesName}: ${p.value}K<br/>`;
        });
        return html;
      },
    },
    legend: { bottom: 0, data: ['大数据岗位', 'IT岗位'] },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dashboard.experienceTrend.map((d) => d.experience),
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}K' },
      splitLine: { lineStyle: { opacity: 0.3 } },
    },
    series: [
      {
        name: '大数据岗位',
        type: 'line',
        smooth: true,
        data: dashboard.experienceTrend.map((d) => d.bigdataSalary),
        lineStyle: { width: 3 },
        itemStyle: { color: CHART_PALETTE[0] },
        areaStyle: {
          opacity: 0.15,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: CHART_PALETTE[0] },
              { offset: 1, color: 'transparent' },
            ],
          },
        },
      },
      {
        name: 'IT岗位',
        type: 'line',
        smooth: true,
        data: dashboard.experienceTrend.map((d) => d.itSalary),
        lineStyle: { width: 3 },
        itemStyle: { color: CHART_PALETTE[2] },
        areaStyle: {
          opacity: 0.15,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: CHART_PALETTE[2] },
              { offset: 1, color: 'transparent' },
            ],
          },
        },
      },
    ],
  };

  // 学历与薪资热力图
  const heatmapOption: EChartsOption = {
    tooltip: {
      position: 'top',
      formatter: (params: any) =>
        `${params.data[1]} · ${params.data[0]}<br/>平均薪资: ${params.data[2]}K`,
    },
    grid: { left: '15%', right: '5%', bottom: '15%', top: '5%' },
    xAxis: {
      type: 'category',
      data: ['应届生', '1-3年', '3-5年'],
      splitArea: { show: true },
      axisLabel: { fontSize: 12 },
    },
    yAxis: {
      type: 'category',
      data: ['博士', '硕士', '本科', '大专'],
      splitArea: { show: true },
      axisLabel: { fontSize: 12 },
    },
    visualMap: {
      min: 8,
      max: 40,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: {
        color: [CHART_PALETTE[2], CHART_PALETTE[0], CHART_PALETTE[1]],
      },
      textStyle: { fontSize: 11 },
    },
    series: [
      {
        name: '薪资',
        type: 'heatmap',
        data: dashboard.educationHeatmap.map((d) => [d.experience, d.education, d.avgSalary]),
        label: {
          show: true,
          formatter: (params: any) => `${params.data[2]}K`,
          fontSize: 12,
        },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' },
        },
      },
    ],
  };

  // 高频技能 TOP 榜单 - 横向条形图
  const skillsBarOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const list = Array.isArray(params) ? params : [params];
        return `${list[0].name}<br/>出现频率: ${list[0].value}%`;
      },
    },
    grid: { left: '3%', right: '10%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}%' },
      splitLine: { lineStyle: { opacity: 0.3 } },
    },
    yAxis: {
      type: 'category',
      data: [...dashboard.topSkills].reverse().map((d) => d.skill),
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: [...dashboard.topSkills].reverse().map((d) => d.frequency),
        barWidth: 14,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: CHART_PALETTE[3] },
              { offset: 1, color: CHART_PALETTE[0] },
            ],
          },
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => `${params.value}%`,
        },
      },
    ],
  };

  // 岗位类型分布 - 环形图
  const pieOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) =>
        `${params.name}<br/>数量: ${params.data.count} 个<br/>占比: ${params.value}%`,
    },
    legend: { bottom: 0, type: 'scroll' },
    series: [
      {
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: 'transparent', borderWidth: 2 },
        label: { show: false },
        emphasis: {
          label: { show: false },
        },
        data: dashboard.jobDistribution.map((d, i) => ({
          value: d.percentage,
          name: d.jobType,
          count: d.count,
          itemStyle: { color: CHART_PALETTE[i % CHART_PALETTE.length] },
        })),
      },
    ],
  };

  return (
    <section id="data-dashboard" className="w-full py-16 md:py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 border-info/30 text-info bg-info/5">
            <Activity className="size-3.5 mr-1.5" />
            行业数据洞察
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              数据驱动决策
            </span>
            <span className="bg-gradient-to-r from-info to-primary bg-clip-text text-transparent">
              {' '}洞悉行业趋势
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            基于 4,398 条真实岗位数据，多维度呈现 IT/大数据行业薪资全貌
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 城市薪资排行 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="size-4 text-primary" />
                  各城市平均薪资排行
                </CardTitle>
                <CardDescription className="text-xs">TOP 10 城市月薪对比（K）</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts option={cityBarOption} theme="ud" className="h-[320px] w-full" />
              </CardContent>
            </Card>
          </motion.div>

          {/* 岗位类型分布 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="size-4 text-accent" />
                  岗位类型分布
                </CardTitle>
                <CardDescription className="text-xs">大数据岗位样本构成</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts option={pieOption} theme="ud" className="h-[320px] w-full" />
              </CardContent>
            </Card>
          </motion.div>

          {/* 经验薪资趋势 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="size-4 text-success" />
                  工作经验薪资增长趋势
                </CardTitle>
                <CardDescription className="text-xs">不同经验阶段薪资对比</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts option={trendLineOption} theme="ud" className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </motion.div>

          {/* 学历薪资热力图 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="size-4 text-warning" />
                  学历与薪资热力图
                </CardTitle>
                <CardDescription className="text-xs">学历 × 经验薪资分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts option={heatmapOption} theme="ud" className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </motion.div>

          {/* 高频技能 TOP 榜 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="size-4 text-primary" />
                  高频技能 TOP 10 榜单
                </CardTitle>
                <CardDescription className="text-xs">岗位需求中出现频率最高的技能</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts option={skillsBarOption} theme="ud" className="h-[340px] w-full" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(DataDashboardSection);
