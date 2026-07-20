// EXPORTS: ISalaryBenchmark, MOCK_SALARY_BENCHMARKS
export interface ISalaryBenchmark {
  id: string
  jobDirection: 'bigdata' | 'it'
  city: string
  education: 'college' | 'bachelor' | 'master' | 'phd'
  experience: 'fresh' | 'lt1' | '1-3' | '3-5' | '5-10' | 'gt10'
  baseSalaryMin: number  // 基础薪资下限（K）
  baseSalaryMax: number  // 基础薪资上限（K）
}

export const MOCK_SALARY_BENCHMARKS: ISalaryBenchmark[] = [
  // 大数据 - 北京 - 本科 - 各经验档
  { id: '1', jobDirection: 'bigdata', city: '北京', education: 'bachelor', experience: 'fresh', baseSalaryMin: 12, baseSalaryMax: 18 },
  { id: '2', jobDirection: 'bigdata', city: '北京', education: 'bachelor', experience: '1-3', baseSalaryMin: 18, baseSalaryMax: 28 },
  { id: '3', jobDirection: 'bigdata', city: '北京', education: 'bachelor', experience: '3-5', baseSalaryMin: 28, baseSalaryMax: 45 },
  { id: '4', jobDirection: 'bigdata', city: '北京', education: 'bachelor', experience: '5-10', baseSalaryMin: 45, baseSalaryMax: 70 },
  { id: '5', jobDirection: 'bigdata', city: '北京', education: 'bachelor', experience: 'gt10', baseSalaryMin: 60, baseSalaryMax: 100 },
  
  // 大数据 - 上海 - 本科
  { id: '6', jobDirection: 'bigdata', city: '上海', education: 'bachelor', experience: 'fresh', baseSalaryMin: 11, baseSalaryMax: 17 },
  { id: '7', jobDirection: 'bigdata', city: '上海', education: 'bachelor', experience: '1-3', baseSalaryMin: 17, baseSalaryMax: 26 },
  { id: '8', jobDirection: 'bigdata', city: '上海', education: 'bachelor', experience: '3-5', baseSalaryMin: 26, baseSalaryMax: 42 },
  
  // 大数据 - 深圳 - 本科
  { id: '9', jobDirection: 'bigdata', city: '深圳', education: 'bachelor', experience: 'fresh', baseSalaryMin: 11, baseSalaryMax: 17 },
  { id: '10', jobDirection: 'bigdata', city: '深圳', education: 'bachelor', experience: '1-3', baseSalaryMin: 17, baseSalaryMax: 27 },
  { id: '11', jobDirection: 'bigdata', city: '深圳', education: 'bachelor', experience: '3-5', baseSalaryMin: 27, baseSalaryMax: 43 },
  
  // 大数据 - 杭州 - 本科
  { id: '12', jobDirection: 'bigdata', city: '杭州', education: 'bachelor', experience: 'fresh', baseSalaryMin: 10, baseSalaryMax: 15 },
  { id: '13', jobDirection: 'bigdata', city: '杭州', education: 'bachelor', experience: '1-3', baseSalaryMin: 15, baseSalaryMax: 24 },
  { id: '14', jobDirection: 'bigdata', city: '杭州', education: 'bachelor', experience: '3-5', baseSalaryMin: 24, baseSalaryMax: 38 },
  
  // 大数据 - 广州 - 本科
  { id: '15', jobDirection: 'bigdata', city: '广州', education: 'bachelor', experience: 'fresh', baseSalaryMin: 9, baseSalaryMax: 14 },
  { id: '16', jobDirection: 'bigdata', city: '广州', education: 'bachelor', experience: '1-3', baseSalaryMin: 14, baseSalaryMax: 22 },
  { id: '17', jobDirection: 'bigdata', city: '广州', education: 'bachelor', experience: '3-5', baseSalaryMin: 22, baseSalaryMax: 35 },
  
  // 大数据 - 成都 - 本科
  { id: '18', jobDirection: 'bigdata', city: '成都', education: 'bachelor', experience: 'fresh', baseSalaryMin: 7, baseSalaryMax: 11 },
  { id: '19', jobDirection: 'bigdata', city: '成都', education: 'bachelor', experience: '1-3', baseSalaryMin: 11, baseSalaryMax: 18 },
  { id: '20', jobDirection: 'bigdata', city: '成都', education: 'bachelor', experience: '3-5', baseSalaryMin: 18, baseSalaryMax: 28 },
  
  // 大数据 - 北京 - 硕士
  { id: '21', jobDirection: 'bigdata', city: '北京', education: 'master', experience: 'fresh', baseSalaryMin: 18, baseSalaryMax: 25 },
  { id: '22', jobDirection: 'bigdata', city: '北京', education: 'master', experience: '1-3', baseSalaryMin: 25, baseSalaryMax: 35 },
  { id: '23', jobDirection: 'bigdata', city: '北京', education: 'master', experience: '3-5', baseSalaryMin: 35, baseSalaryMax: 55 },
  
  // 大数据 - 北京 - 大专
  { id: '24', jobDirection: 'bigdata', city: '北京', education: 'college', experience: 'fresh', baseSalaryMin: 8, baseSalaryMax: 12 },
  { id: '25', jobDirection: 'bigdata', city: '北京', education: 'college', experience: '1-3', baseSalaryMin: 12, baseSalaryMax: 20 },
  { id: '26', jobDirection: 'bigdata', city: '北京', education: 'college', experience: '3-5', baseSalaryMin: 20, baseSalaryMax: 32 },
  
  // IT岗位 - 北京 - 本科
  { id: '27', jobDirection: 'it', city: '北京', education: 'bachelor', experience: 'fresh', baseSalaryMin: 10, baseSalaryMax: 16 },
  { id: '28', jobDirection: 'it', city: '北京', education: 'bachelor', experience: '1-3', baseSalaryMin: 16, baseSalaryMax: 25 },
  { id: '29', jobDirection: 'it', city: '北京', education: 'bachelor', experience: '3-5', baseSalaryMin: 25, baseSalaryMax: 40 },
  { id: '30', jobDirection: 'it', city: '北京', education: 'bachelor', experience: '5-10', baseSalaryMin: 40, baseSalaryMax: 65 },
  
  // IT岗位 - 上海 - 本科
  { id: '31', jobDirection: 'it', city: '上海', education: 'bachelor', experience: 'fresh', baseSalaryMin: 9, baseSalaryMax: 15 },
  { id: '32', jobDirection: 'it', city: '上海', education: 'bachelor', experience: '1-3', baseSalaryMin: 15, baseSalaryMax: 24 },
  { id: '33', jobDirection: 'it', city: '上海', education: 'bachelor', experience: '3-5', baseSalaryMin: 24, baseSalaryMax: 38 },
  
  // IT岗位 - 深圳 - 本科
  { id: '34', jobDirection: 'it', city: '深圳', education: 'bachelor', experience: 'fresh', baseSalaryMin: 10, baseSalaryMax: 15 },
  { id: '35', jobDirection: 'it', city: '深圳', education: 'bachelor', experience: '1-3', baseSalaryMin: 15, baseSalaryMax: 24 },
  { id: '36', jobDirection: 'it', city: '深圳', education: 'bachelor', experience: '3-5', baseSalaryMin: 24, baseSalaryMax: 39 },
]