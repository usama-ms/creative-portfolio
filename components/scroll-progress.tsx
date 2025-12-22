"use client"

import { useState, useEffect } from "react"

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = windowHeight > 0 ? scrolled / windowHeight : 0
      
      setScrollProgress(progress)
      
      if (scrolled > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial calculation
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50 transition-opacity duration-300"
      style={{ 
        transform: `scaleX(${scrollProgress})`,
        opacity: isVisible ? 1 : 0,
        transformOrigin: "left"
      }}
    />
  )
}
