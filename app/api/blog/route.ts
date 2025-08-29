import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { BlogPost } from '@/lib/blog'

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    const dir = path.dirname(DATA_FILE)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify({ posts: [] }))
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureDataFile()
    
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')
    
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const { posts }: { posts: BlogPost[] } = JSON.parse(data)
    
    let filteredPosts = posts
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category)
    }
    
    if (featured === 'true') {
      filteredPosts = filteredPosts.filter(post => post.featured)
    }
    
    if (published !== 'false') {
      filteredPosts = filteredPosts.filter(post => post.published)
    }
    
    filteredPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    
    return NextResponse.json({ posts: filteredPosts })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const adminToken = process.env.ADMIN_TOKEN || 'simpli-admin-2025'
    
    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await ensureDataFile()
    
    const newPost: BlogPost = await request.json()
    
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const { posts }: { posts: BlogPost[] } = JSON.parse(data)
    
    newPost.id = Date.now().toString()
    newPost.publishedAt = new Date().toISOString()
    newPost.updatedAt = new Date().toISOString()
    
    posts.push(newPost)
    
    await fs.writeFile(DATA_FILE, JSON.stringify({ posts }, null, 2))
    
    return NextResponse.json({ post: newPost })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const adminToken = process.env.ADMIN_TOKEN || 'simpli-admin-2025'
    
    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    await ensureDataFile()
    
    const updatedPost: BlogPost = await request.json()
    
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const { posts }: { posts: BlogPost[] } = JSON.parse(data)
    
    const index = posts.findIndex(p => p.id === updatedPost.id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    updatedPost.updatedAt = new Date().toISOString()
    posts[index] = updatedPost
    
    await fs.writeFile(DATA_FILE, JSON.stringify({ posts }, null, 2))
    
    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const adminToken = process.env.ADMIN_TOKEN || 'simpli-admin-2025'
    
    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID required' },
        { status: 400 }
      )
    }
    
    await ensureDataFile()
    
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const { posts }: { posts: BlogPost[] } = JSON.parse(data)
    
    const filteredPosts = posts.filter(p => p.id !== id)
    
    if (filteredPosts.length === posts.length) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    await fs.writeFile(DATA_FILE, JSON.stringify({ posts: filteredPosts }, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}