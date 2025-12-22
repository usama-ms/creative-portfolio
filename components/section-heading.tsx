"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center space-y-4">
      <div className={`scroll-reveal ${isIntersecting ? "revealed" : ""}`} style={{ transitionDelay: "0s" }}>
        <div className="inline-block">
          <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
            <span className="relative z-10">{subtitle}</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
          </div>
        </div>
      </div>

      <h2
        className={`scroll-reveal ${isIntersecting ? "revealed" : ""} text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300`}
        style={{ transitionDelay: "0.2s" }}
      >
        {title}
      </h2>

      <div
        className={`scroll-reveal-scale-x ${isIntersecting ? "revealed" : ""} w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-6`}
        style={{ transitionDelay: "0.4s" }}
      />
    </div>
  )
}
