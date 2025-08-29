'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]

    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const isLast = index === paths.length - 1
      
      // Format label (capitalize and replace hyphens)
      let label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      // Custom labels for specific pages
      const customLabels: Record<string, string> = {
        'services': 'Services',
        'roofing': 'Roofing',
        'windows': 'Windows',
        'siding': 'Siding & Stucco',
        'gutters': 'Aluminum Gutters',
        'about': 'About Us',
        'contact': 'Contact',
        'projects': 'Projects'
      }
      
      if (customLabels[path]) {
        label = customLabels[path]
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://simpliexteriors.com${item.href}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav 
        aria-label="Breadcrumb" 
        className="bg-gray-50 border-b border-gray-200"
      >
        <div className="container-padding py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
                
                {item.current ? (
                  <span 
                    className="text-gray-700 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-primary-600 hover:text-primary-700 transition-colors flex items-center"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}

// Mobile-optimized breadcrumbs
export function MobileBreadcrumbs() {
  const pathname = usePathname()
  
  if (pathname === '/') return null

  const paths = pathname.split('/').filter(Boolean)
  const currentPage = paths[paths.length - 1]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  const parentPath = paths.length > 1 ? `/${paths.slice(0, -1).join('/')}` : '/'
  const parentLabel = paths.length > 1 ? paths[paths.length - 2]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : 'Home'

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-gray-50 border-b border-gray-200 lg:hidden"
    >
      <div className="container-padding py-3">
        <div className="flex items-center justify-between">
          <Link
            href={parentPath}
            className="text-primary-600 hover:text-primary-700 transition-colors flex items-center text-sm"
          >
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            {parentLabel}
          </Link>
          <span className="text-gray-700 font-medium text-sm">
            {currentPage}
          </span>
        </div>
      </div>
    </nav>
  )
}