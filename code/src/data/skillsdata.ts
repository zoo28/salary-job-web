// EXPORTS: ISkill, MOCK_SKILLS
export interface ISkill {
  id: string
  name: string
  category: 'programming' | 'database' | 'bigdata' | 'analytics' | 'cloud'
  jobDirection: 'bigdata' | 'it' | 'both'
  salaryPremium: number
  difficulty: 1 | 2 | 3 | 4 | 5
  learnMonths: number
  frequency: number
}

export const MOCK_SKILLS: ISkill[] = [
  { id: 'python', name: 'Python', category: 'programming', jobDirection: 'both', salaryPremium: 2500, difficulty: 2, learnMonths: 2, frequency: 85 },
  { id: 'sql', name: 'SQL', category: 'database', jobDirection: 'both', salaryPremium: 1800, difficulty: 1, learnMonths: 1, frequency: 92 },
  { id: 'java', name: 'Java', category: 'programming', jobDirection: 'it', salaryPremium: 3000, difficulty: 4, learnMonths: 4, frequency: 78 },
  { id: 'spark', name: 'Spark', category: 'bigdata', jobDirection: 'bigdata', salaryPremium: 4000, difficulty: 4, learnMonths: 3, frequency: 65 },
  { id: 'hadoop', name: 'Hadoop', category: 'bigdata', jobDirection: 'bigdata', salaryPremium: 3500, difficulty: 4, learnMonths: 3, frequency: 58 },
  { id: 'flink', name: 'Flink', category: 'bigdata', jobDirection: 'bigdata', salaryPremium: 4500, difficulty: 5, learnMonths: 4, frequency: 42 },
  { id: 'hive', name: 'Hive', category: 'bigdata', jobDirection: 'bigdata', salaryPremium: 2800, difficulty: 3, learnMonths: 2, frequency: 60 },
  { id: 'mysql', name: 'MySQL', category: 'database', jobDirection: 'both', salaryPremium: 2000, difficulty: 2, learnMonths: 1, frequency: 88 },
  { id: 'etl', name: 'ETL', category: 'bigdata', jobDirection: 'bigdata', salaryPremium: 2200, difficulty: 2, learnMonths: 2, frequency: 55 },
  { id: 'bi', name: 'BI工具', category: 'analytics', jobDirection: 'bigdata', salaryPremium: 1500, difficulty: 2, learnMonths: 1, frequency: 50 },
  { id: 'excel', name: 'Excel高级', category: 'analytics', jobDirection: 'both', salaryPremium: 800, difficulty: 1, learnMonths: 0.5, frequency: 70 },
  { id: 'aws', name: 'AWS', category: 'cloud', jobDirection: 'both', salaryPremium: 3500, difficulty: 4, learnMonths: 3, frequency: 45 },
  { id: 'redis', name: 'Redis', category: 'database', jobDirection: 'it', salaryPremium: 2500, difficulty: 2, learnMonths: 1, frequency: 68 },
  { id: 'mongodb', name: 'MongoDB', category: 'database', jobDirection: 'it', salaryPremium: 2000, difficulty: 2, learnMonths: 1, frequency: 52 },
  { id: 'kubernetes', name: 'Kubernetes', category: 'cloud', jobDirection: 'it', salaryPremium: 4000, difficulty: 5, learnMonths: 4, frequency: 48 },
]