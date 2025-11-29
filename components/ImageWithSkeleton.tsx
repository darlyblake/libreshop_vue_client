"use client"
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
}

export default function ImageWithSkeleton({ src, alt, fill = false, width, height, sizes, className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true as const } : {})}
        width={width}
        height={height}
        sizes={sizes}
        className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoadingComplete={() => setLoaded(true)}
        priority={false}
      />

      {/* skeleton overlay until image loaded */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
    </div>
  )
}
