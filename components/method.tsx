"use client"

import { useRef, useEffect, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Диагностика",
    description: "Глубокий анализ вашего текущего уровня, целей и специфики бизнеса.",
  },
  {
    number: "02",
    title: "Индивидуальный план",
    description: "Разработка персональной программы с учётом вашего графика и задач.",
  },
  {
    number: "03",
    title: "Интенсивная практика",
    description: "Регулярные занятия с фокусом на реальных бизнес-ситуациях.",
  },
  {
    number: "04",
    title: "Результат",
    description: "Уверенное общение с носителями языка без языкового барьера.",
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div 
      ref={cardRef}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-primary-foreground/20 -translate-y-1/2 z-0" />
      )}
      
      <div className="relative p-8 rounded-3xl border border-primary-foreground/20 hover:border-primary-foreground/40 hover:bg-primary-foreground/5 transition-all group-hover:scale-105">
        <span className="font-serif text-6xl text-primary-foreground/10 absolute top-4 right-4 group-hover:text-primary-foreground/20 transition-colors">
          {step.number}
        </span>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-6 group-hover:bg-primary-foreground/20 transition-colors">
            <span className="font-serif text-xl text-primary-foreground">{step.number}</span>
          </div>
          <h3 className="font-serif text-xl mb-3 text-primary-foreground">{step.title}</h3>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Method() {
  return (
    <section id="method" className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-primary-foreground/5 animate-spin-slow" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full border border-primary-foreground/5 animate-spin-slow-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/60 mb-6">
            Метод
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
            Проверенный путь к
            <span className="italic"> совершенству</span>
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Каждый шаг продуман для максимальной эффективности вашего обучения.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-widest uppercase border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all rounded-full hover:scale-105"
          >
            Начать путь к успеху
          </a>
        </div>
      </div>
    </section>
  )
}
