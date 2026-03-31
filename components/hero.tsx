"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FallingCrosses } from "./falling-crosses"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-background">
      {/* 3D Background */}
      <FallingCrosses />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tagline with animation */}
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-8 animate-fade-in-up">
            Премиум репетитор английского языка
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] text-balance mb-8 animate-fade-in-up animation-delay-100">
            Английский для
            <span className="block italic text-primary">международного бизнеса</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-pretty animate-fade-in-up animation-delay-200">
            Индивидуальные занятия для владельцев бизнеса, стремящихся к уровню носителя. 
            Переговоры, личный бренд, деловые связи — на английском языке.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link 
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
            >
              Записаться на консультацию
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#strategy"
              className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-widest uppercase border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all rounded-full hover:scale-105"
            >
              Стратегия обучения
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 pt-12 border-t border-border animate-fade-in-up animation-delay-400">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center group cursor-default">
                <p className="font-serif text-4xl lg:text-5xl text-foreground mb-2 group-hover:text-primary transition-colors">15+</p>
                <p className="text-sm tracking-widest uppercase text-muted-foreground">Довольных клиентов</p>
              </div>
              <div className="text-center group cursor-default">
                <p className="font-serif text-4xl lg:text-5xl text-foreground mb-2 group-hover:text-primary transition-colors">3</p>
                <p className="text-sm tracking-widest uppercase text-muted-foreground">Года опыта</p>
              </div>
              <div className="text-center group cursor-default col-span-2 md:col-span-1">
                <p className="font-serif text-4xl lg:text-5xl text-foreground mb-2 group-hover:text-primary transition-colors">C2</p>
                <p className="text-sm tracking-widest uppercase text-muted-foreground">Уровень владения</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
