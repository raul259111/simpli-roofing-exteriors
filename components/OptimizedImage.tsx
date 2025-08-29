'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  fill?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  onLoad?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes,
  placeholder = 'blur',
  blurDataURL,
  quality = 75,
  onLoad
}: OptimizedImageProps) {
  const [isInView, setIsInView] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority])

  const handleLoad = () => {
    setHasLoaded(true)
    if (onLoad) {
      onLoad()
    }
  }

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {isInView ? (
        <>
          {!hasLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes || '100vw'}
              quality={quality}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL || defaultBlurDataURL}
              onLoad={handleLoad}
              className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width || 500}
              height={height || 300}
              quality={quality}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL || defaultBlurDataURL}
              onLoad={handleLoad}
              className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            />
          )}
        </>
      ) : (
        <div className={`bg-gray-200 animate-pulse rounded-lg ${fill ? 'absolute inset-0' : ''}`} 
             style={!fill ? { width: width || 500, height: height || 300 } : {}} />
      )}
    </div>
  )
}

// Placeholder image component for hero sections
export function HeroPlaceholder({ 
  icon, 
  title, 
  subtitle 
}: { 
  icon: string
  title: string
  subtitle: string 
}) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-gray-200 rounded-2xl flex items-center justify-center">
      <div className="text-center text-gray-500 p-8">
        <div className="text-6xl mb-4">{icon}</div>
        <div className="text-lg font-medium">{title}</div>
        <div className="text-sm">{subtitle}</div>
      </div>
    </div>
  )
}