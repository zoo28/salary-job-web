// EXPORTS: IDashboardData, MOCK_DASHBOARD_DATA
export interface IDashboardData {
  id: string
  citySalaryRank: { city: string; avgSalary: number }[]
  educationHeatmap: { education: string; experience: string; avgSalary: number }[]
  experienceTrend: { experience: string; bigdataSalary: number; itSalary: number }[]
  topSkills: { skill: string; frequency: number; premium: number }[]
  jobDistribution: { jobType: string; count: number; percentage: number }[]
}

export const MOCK_DASHBOARD_DATA: IDashboardData[] = [
  {
    id: '1',
    citySalaryRank: [
      { city: '北京', avgSalary: 28.5 },
      { city: '上海', avgSalary: 26.8 },
      { city: '深圳', avgSalary: 26.2 },
      { city: '杭州', avgSalary: 23.5 },
      { city: '广州', avgSalary: 21.3 },
      { city: '南京', avgSalary: 19.8 },
      { city: '成都', avgSalary: 18.2 },
      { city: '武汉', avgSalary: 17.5 },
      { city: '西安', avgSalary: 16.8 },
      { city: '苏州', avgSalary: 18.5 },
    ],
    educationHeatmap: [
      { education: '大专', experience: '应届生', avgSalary: 8.5 },
      { education: '大专', experience: '1-3年', avgSalary: 12.3 },
      { education: '大专', experience: '3-5年', avgSalary: 16.8 },
      { education: '本科', experience: '应届生', avgSalary: 11.2 },
      { education: '本科', experience: '1-3年', avgSalary: 16.5 },
      { education: '本科', experience: '3-5年', avgSalary: 22.8 },
      { education: '硕士', experience: '应届生', avgSalary: 15.8 },
      { education: '硕士', experience: '1-3年', avgSalary: 21.5 },
      { education: '硕士', experience: '3-5年', avgSalary: 28.6 },
      { education: '博士', experience: '应届生', avgSalary: 22.5 },
      { education: '博士', experience: '1-3年', avgSalary: 30.2 },
      { education: '博士', experience: '3-5年', avgSalary: 38.5 },
    ],
    experienceTrend: [
      { experience: '应届生', bigdataSalary: 12.5, itSalary: 10.8 },
      { experience: '1年以内', bigdataSalary: 15.2, itSalary: 13.5 },
      { experience: '1-3年', bigdataSalary: 20.8, itSalary: 18.2 },
      { experience: '3-5年', bigdataSalary: 28.5, itSalary: 25.3 },
      { experience: '5-10年', bigdataSalary: 38.2, itSalary: 34.6 },
      { experience: '10年以上', bigdataSalary: 48.5, itSalary: 42.8 },
    ],
    topSkills: [
      { skill: 'Python', frequency: 78, premium: 15 },
      { skill: 'SQL', frequency: 72, premium: 12 },
      { skill: 'Java', frequency: 65, premium: 18 },
      { skill: 'Spark', frequency: 48, premium: 22 },
      { skill: 'Hadoop', frequency: 42, premium: 20 },
      { skill: 'Hive', frequency: 38, premium: 16 },
      { skill: 'Flink', frequency: 32, premium: 25 },
      { skill: 'MySQL', frequency: 58, premium: 10 },
      { skill: 'ETL', frequency: 35, premium: 14 },
      { skill: 'BI', frequency: 28, premium: 13 },
    ],
    jobDistribution: [
      { jobType: '数据开发岗', count: 1280, percentage: 39.9 },
      { jobType: '数据分析岗', count: 856, percentage: 26.7 },
      { jobType: '数据治理岗', count: 412, percentage: 12.8 },
      { jobType: '产品/销售岗', count: 385, percentage: 12.0 },
      { jobType: '管理岗', count: 277, percentage: 8.6 },
    ],
  },
]