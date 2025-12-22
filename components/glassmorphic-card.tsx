"use client"

import type { ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface GlassmorphicCardProps {
  children: ReactNode
}

export function GlassmorphicCard({ children }: GlassmorphicCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-reveal ${isIntersecting ? "revealed" : ""} transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
