"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Github, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl?: string
  repoUrl?: string
}

// Helper function to check if a URL is a valid, meaningful URL (not a placeholder)
function isValidUrl(url?: string): boolean {
  if (!url) return false
  
  try {
    const urlObj = new URL(url.trim())
    const pathname = urlObj.pathname
    
    // List of placeholder base domains
    const placeholderDomains = ['example.com', 'www.example.com']
    
    // If it's a placeholder domain, it's invalid
    if (placeholderDomains.includes(urlObj.hostname)) {
      return false
    }
    
    // For GitHub specifically, check if it's just the base domain (no meaningful path)
    if (urlObj.hostname === 'github.com' || urlObj.hostname === 'www.github.com') {
      // If pathname is empty or just '/', it's invalid (just the base domain)
      // Valid GitHub URLs should have at least /username or /username/repo
      return pathname.length > 1 && pathname.split('/').filter(Boolean).length > 0
    }
    
    // For other domains, as long as it's a valid URL, it's considered valid
    return urlObj.hostname.length > 0
  } catch {
    return false
  }
}

export function ProjectCard({ title, description, tags, image, demoUrl, repoUrl }: ProjectCardProps) {
  const hasValidDemoUrl = isValidUrl(demoUrl)
  const hasValidRepoUrl = isValidUrl(repoUrl)
  const [isHovered, setIsHovered] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-reveal ${isIntersecting ? "revealed" : ""} group`}
    >
      <div
        className="relative h-full overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 group-hover:border-purple-500/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative h-full flex flex-col">
          <div 
            className="relative w-full aspect-video overflow-hidden bg-zinc-900/50 cursor-pointer"
            onClick={() => setIsImageOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className={`object-contain w-full h-full transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-zinc-400 mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="px-6 pb-6 flex justify-between border-t border-zinc-700/50 pt-4">
              {hasValidRepoUrl ? (
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-700/50" asChild>
                  <Link href={repoUrl!} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-zinc-500 cursor-not-allowed" disabled>
                  <Github className="mr-2 h-4 w-4" />
                  <span className="text-xs">Code is confidential</span>
                </Button>
              )}
              {hasValidDemoUrl ? (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
                  asChild
                >
                  <Link href={demoUrl!} target="_blank" rel="noopener noreferrer">
                    Live Demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-zinc-700/50 text-zinc-400 cursor-not-allowed border-0"
                  disabled
                >
                  <span className="text-xs">Internal client use</span>
                </Button>
              )}
          </div>

          <div className="absolute top-3 right-3 z-20">
            <div
              className={`w-3 h-3 rounded-full ${isHovered ? "bg-green-500" : "bg-zinc-500"} transition-colors duration-300`}
            ></div>
          </div>
        </div>
      </div>

      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-zinc-900 border-zinc-700">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>
          <div className="relative w-full h-[80vh] bg-zinc-900">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white"
              onClick={() => setIsImageOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
