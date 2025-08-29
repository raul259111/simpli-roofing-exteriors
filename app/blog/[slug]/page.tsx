import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPostContent from './BlogPostContent'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Blog Post | Simpli Roofing & Exteriors`,
    description: 'Expert insights on home exterior maintenance and improvements in Southern Utah.',
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <BlogPostContent slug={slug} />
      <Footer />
    </main>
  )
}