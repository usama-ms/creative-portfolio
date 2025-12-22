"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useEffect, useState } from "react"

interface SkillBadgeProps {
  name: string
  level: number
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15, triggerOnce: true })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isIntersecting) {
      setTimeout(() => {
        setWidth(level)
      }, 300)
    }
  }, [isIntersecting, level])

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-reveal-scale ${isIntersecting ? "revealed" : ""} transition-transform duration-300 hover:-translate-y-1`}
      style={{ overflow: "visible" }}
    >
      <div className="relative overflow-visible rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 h-full transition-all duration-300 hover:border-purple-500/50">
        <div className="relative">
          <div className="text-center mb-4 font-medium text-lg">{name}</div>

          <div className="relative h-2.5 w-full bg-zinc-700 rounded-full overflow-visible">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${width}%`, transitionDelay: "0.3s" }}
            />
          </div>

          <div className="mt-2 text-right text-sm text-zinc-400">{level}%</div>
        </div>
      </div>
    </div>
  )
}
