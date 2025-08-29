export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  featured: boolean
  coverImage?: string
  tags: string[]
  category: 'roofing' | 'windows' | 'siding' | 'gutters' | 'maintenance' | 'news'
  readTime: number
  published: boolean
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Roofing',
    slug: 'roofing',
    description: 'Tips, guides, and insights about roofing',
    postCount: 0
  },
  {
    id: '2',
    name: 'Windows',
    slug: 'windows',
    description: 'Window installation and maintenance advice',
    postCount: 0
  },
  {
    id: '3',
    name: 'Siding',
    slug: 'siding',
    description: 'Siding and stucco information',
    postCount: 0
  },
  {
    id: '4',
    name: 'Gutters',
    slug: 'gutters',
    description: 'Gutter system tips and maintenance',
    postCount: 0
  },
  {
    id: '5',
    name: 'Maintenance',
    slug: 'maintenance',
    description: 'Home exterior maintenance guides',
    postCount: 0
  },
  {
    id: '6',
    name: 'Company News',
    slug: 'news',
    description: 'Updates and news from Simpli',
    postCount: 0
  }
]

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}