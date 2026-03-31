"use client"

import { Briefcase, Users, Mic, Globe, Award, BookOpen } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const services = [
  {
    icon: Briefcase,
    title: "Деловые переговоры",
    description: "Мастерство ведения переговоров на английском: от подготовки до заключения сделки.",
  },
  {
    icon: Mic,
    title: "Публичные выступления",
    description: "Уверенные презентации и выступления на международных конференциях.",
  },
  {
    icon: Users,
    title: "Нетворкинг",
    description: "Искусство small talk и построения деловых связей на английском.",
  },
  {
    icon: Globe,
    title: "Личный бренд",
    description: "Создание профессионального имиджа на международной арене.",
  },
  {
    icon: Award,
    title: "Executive Coaching",
    description: "Персональный коучинг для топ-менеджеров и владельцев бизнеса.",
  },
  {
    icon: BookOpen,
    title: "Интенсивные курсы",
    description: "Ускоренные программы для быстрого достижения результата.",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
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
      className={`group p-8 lg:p-10 bg-background rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
        <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">
            Услуги
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
            Программы для достижения
            <span className="italic text-primary"> ваших целей</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Каждая программа адаптируется под ваши индивидуальные потребности и график.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
