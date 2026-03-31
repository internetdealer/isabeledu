"use client"

import { Brain, MessageCircle, BookText, MessagesSquare } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const strategies = [
  {
    icon: Brain,
    number: "01",
    title: "Думать на английском",
    description: "Формирование нового способа мышления — без перевода с русского. Вы начинаете думать сразу на английском, что ускоряет речь и делает её естественной.",
    color: "bg-primary/10",
    accent: "text-primary",
  },
  {
    icon: MessageCircle,
    number: "02", 
    title: "Говорить быстрее перевода",
    description: "Развитие автоматизма речи, когда слова приходят раньше, чем вы успеваете перевести их в голове с русского. Спонтанность и уверенность.",
    color: "bg-primary/15",
    accent: "text-primary",
  },
  {
    icon: BookText,
    number: "03",
    title: "Бизнес-лексика",
    description: "Целенаправленное изучение профессиональной лексики: переговоры, финансы, маркетинг, юридические термины — всё, что нужно для вашей сферы.",
    color: "bg-primary/20",
    accent: "text-primary",
  },
  {
    icon: MessagesSquare,
    number: "04",
    title: "Разговорные структуры",
    description: "Освоение готовых речевых конструкций и идиом, которые используют носители. Ваша речь становится живой и аутентичной.",
    color: "bg-primary/25",
    accent: "text-primary",
  },
]

function StrategyCard({ strategy, index }: { strategy: typeof strategies[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group relative p-8 lg:p-10 bg-background rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Number badge */}
      <span className="absolute top-6 right-6 font-serif text-6xl text-primary/10 group-hover:text-primary/20 transition-colors">
        {strategy.number}
      </span>
      
      {/* Icon */}
      <div className={`w-14 h-14 ${strategy.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <strategy.icon className={`w-7 h-7 ${strategy.accent}`} />
      </div>
      
      {/* Content */}
      <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
        {strategy.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {strategy.description}
      </p>

      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-colors" />
    </div>
  )
}

export function Strategy() {
  return (
    <section id="strategy" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">
            Стратегия обучения
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
            Четыре столпа
            <span className="italic text-primary"> успешного обучения</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Моя авторская методика построена на принципах, которые позволяют 
            достичь уровня носителя в кратчайшие сроки.
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {strategies.map((strategy, index) => (
            <StrategyCard key={strategy.number} strategy={strategy} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
          >
            Начать обучение по стратегии
          </a>
        </div>
      </div>
    </section>
  )
}
