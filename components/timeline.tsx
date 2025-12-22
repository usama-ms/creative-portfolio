"use client"

import { useMobile } from "@/hooks/use-mobile"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const experiences = [
  {
    title: "Software Engineer",
    company: "Mergestack",
    period: "Aug 2023 - Present",
    description:
      "Full-time Software Engineer working on cutting-edge web applications. Developing scalable solutions, implementing new features, and collaborating with cross-functional teams to deliver high-quality products.",
  },
  {
    title: "Associate Software Engineer",
    company: "Technosoft Solutions",
    period: "Jul 2022 - Jun 2023",
    description:
      "Full-time Associate Software Engineer. Developed responsive web applications using modern technologies. Collaborated with designers and backend engineers to deliver high-quality products and solutions.",
  },
  {
    title: "Freelance Software Engineer",
    company: "Fiverr",
    period: "Jan 2021 - Present",
    description:
      "Worked as a freelance software engineer, delivering custom web applications and solutions for various clients. Built responsive websites, web applications, and provided technical consulting services.",
  },
  {
    title: "Software Engineering Intern",
    company: "Tech Solutions Inc.",
    period: "Jan 2022 - Jul 2022",
    description:
      "Internship focused on web development and software engineering practices. Assisted in developing web applications, learned modern development frameworks, and contributed to real-world projects.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => {
        const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

        return (
          <div
            key={index}
            className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"} ${index % 2 === 0 ? "scroll-reveal-slide-right" : "scroll-reveal-slide-left"} ${isIntersecting ? "revealed" : ""}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

                <div className="relative">
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <div className="text-zinc-400 mb-4">
                    {experience.company} | {experience.period}
                  </div>
                  <p className="text-zinc-300">{experience.description}</p>
                </div>
              </div>
            </div>

            {!isMobile && (
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div
                  className={`scroll-reveal-scale-dot ${isIntersecting ? "revealed" : ""} w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center`}
                  style={{ transitionDelay: `${index * 0.15 + 0.2}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
