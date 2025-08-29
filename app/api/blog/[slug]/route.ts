import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { BlogPost } from '@/lib/blog'

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const { posts }: { posts: BlogPost[] } = JSON.parse(data)
    
    const post = posts.find(p => p.slug === slug && p.published)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}