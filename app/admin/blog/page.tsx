import { Metadata } from 'next'
import { Suspense } from 'react'
import AdminBlogContent from './AdminBlogContent'

export const metadata: Metadata = {
  title: 'Blog Admin | Simpli Roofing & Exteriors',
  description: 'Admin panel for managing blog posts',
  robots: 'noindex, nofollow',
}

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminBlogContent />
    </Suspense>
  )
}