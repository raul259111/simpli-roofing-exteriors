'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Mail, Phone } from 'lucide-react'
import { BlogPost, formatDate, blogCategories } from '@/lib/blog'

interface BlogPostContentProps {
  slug: string
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchPost()
  }, [slug])

  useEffect(() => {
    if (post) {
      fetchRelatedPosts()
    }
  }, [post])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`)
      if (!response.ok) {
        router.push('/blog')
        return
      }
      const data = await response.json()
      setPost(data.post)
    } catch (error) {
      router.push('/blog')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async () => {
    if (!post) return
    
    try {
      const response = await fetch(`/api/blog?category=${post.category}&published=true`)
      const data = await response.json()
      const filtered = data.posts.filter((p: BlogPost) => p.id !== post.id).slice(0, 3)
      setRelatedPosts(filtered)
    } catch (error) {
      setRelatedPosts([])
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
    }
  }

  const renderContent = (content: string) => {
    const paragraphs = content.split('\n\n')
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        )
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        )
      } else if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map(item => item.replace('- ', ''))
        return (
          <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="text-gray-600">{item}</li>
            ))}
          </ul>
        )
      } else if (paragraph.match(/^\d+\. /)) {
        const items = paragraph.split('\n')
        return (
          <ol key={index} className="list-decimal pl-6 mb-6 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="text-gray-600">
                {item.replace(/^\d+\. /, '')}
              </li>
            ))}
          </ol>
        )
      } else {
        return (
          <p key={index} className="text-gray-600 mb-6 leading-relaxed">
            {paragraph}
          </p>
        )
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Article not found</p>
          <Link href="/blog" className="text-primary-600 hover:underline mt-4 inline-block">
            Return to Blog
          </Link>
        </div>
      </div>
    )
  }

  const category = blogCategories.find(c => c.slug === post.category)

  return (
    <>
      <article className="pt-24 lg:pt-32 pb-16">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                {category?.name}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pb-8 border-b mb-8">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">{post.author}</span>
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>

            {post.coverImage && (
              <div className="relative h-96 mb-8 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Article Cover Image</span>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {renderContent(post.content)}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-5 w-5 text-gray-400" />
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <section className="py-16 bg-primary-600 text-white">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Improve Your Home's Exterior?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get a free consultation from our experts with 30+ years of experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:4359224340"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 435-922-4340
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center bg-primary-700 text-white px-8 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold"
              >
                <Mail className="h-5 w-5 mr-2" />
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <article className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all h-full">
                      {relatedPost.coverImage && (
                        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">Related Article</span>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {category?.name}
                        </span>
                        
                        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                          <span className="text-primary-600 group-hover:underline">
                            Read →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}