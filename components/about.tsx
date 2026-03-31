"use client"

import { useEffect, useRef, useState } from "react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="font-serif text-5xl lg:text-6xl text-primary">
      {count}{suffix}
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-card/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] rounded-l-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Stats & Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-background rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
                <AnimatedCounter target={15} suffix="+" />
                <p className="text-sm tracking-widest uppercase text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                  Довольных клиентов
                </p>
              </div>
              <div className="bg-background rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow group mt-8">
                <AnimatedCounter target={100} suffix="%" />
                <p className="text-sm tracking-widest uppercase text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                  Рекомендуют
                </p>
              </div>
              <div className="bg-primary rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
                <div className="font-serif text-5xl lg:text-6xl text-primary-foreground">C2</div>
                <p className="text-sm tracking-widest uppercase text-primary-foreground/70 mt-2">
                  Уровень владения
                </p>
              </div>
              <div className="bg-background rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow group mt-8">
                <AnimatedCounter target={3} />
                <p className="text-sm tracking-widest uppercase text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                  Года опыта
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6 animate-fade-in-up">
              О нас
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              Эксклюзивное обучение для
              <span className="italic text-primary"> лидеров бизнеса</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Isabel Edu — это премиальная школа английского языка для русскоговорящих 
                предпринимателей, которые стремятся к безупречному владению языком на уровне 
                носителя.
              </p>
              <p>
                Наша миссия — помочь вам говорить на английском так, чтобы ваши международные 
                партнёры не замечали языкового барьера. Мы фокусируемся на бизнес-коммуникации: 
                переговоры, презентации, нетворкинг и личный бренд.
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-10 flex flex-wrap gap-3">
              {["Индивидуальный подход", "Гибкий график", "Онлайн формат", "Бизнес-фокус"].map((benefit) => (
                <span 
                  key={benefit}
                  className="px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
