'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react'
import { BlogPost, blogCategories, formatDate } from '@/lib/blog'

export default function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, selectedCategory, searchTerm])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?published=true')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }

  const featuredPost = posts.find(post => post.featured)

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-8 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Exterior Home Tips & Insights
            </h1>
            <p className="text-lg text-gray-600">
              Expert advice on roofing, windows, siding, and home maintenance in Southern Utah
            </p>
          </div>
        </div>
      </section>

      <div className="container-padding py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Posts
            </button>
            {blogCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'all'
                ? 'No posts found matching your criteria.'
                : 'No blog posts available yet.'}
            </p>
          </div>
        ) : (
          <>
            {featuredPost && selectedCategory === 'all' && !searchTerm && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <article className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="lg:flex">
                      {featuredPost.coverImage && (
                        <div className="lg:w-1/2 relative h-64 lg:h-auto">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent z-10" />
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Featured Image</span>
                          </div>
                        </div>
                      )}
                      <div className="lg:w-1/2 p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                            {blogCategories.find(c => c.slug === featuredPost.category)?.name}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(featuredPost.publishedAt)}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                          {featuredPost.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {featuredPost.readTime} min read
                          </span>
                          
                          <span className="text-primary-600 font-medium flex items-center group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts
                .filter(post => !post.featured || selectedCategory !== 'all' || searchTerm)
                .map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                      {post.coverImage && (
                        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">Blog Image</span>
                        </div>
                      )}
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {blogCategories.find(c => c.slug === post.category)?.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min
                          </span>
                          
                          <span className="text-primary-600 font-medium text-sm group-hover:underline">
                            Read →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Informed About Home Maintenance
            </h2>
            <p className="text-gray-600 mb-8">
              Get expert tips and insights delivered to your inbox. Learn how to protect and maintain your home's exterior.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Subscribe to Updates
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}