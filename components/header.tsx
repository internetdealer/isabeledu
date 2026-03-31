"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.svg"
              alt="Isabel Edu"
              width={100}
              height={32}
              className="h-6 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#about" 
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              О нас
            </Link>
            <Link 
              href="#services" 
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              Услуги
            </Link>
            <Link 
              href="#strategy" 
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              Стратегия
            </Link>
            <Link 
              href="#method" 
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              Метод
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2 text-xs tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full hover:scale-105"
            >
              Записаться
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                href="#about" 
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                О нас
              </Link>
              <Link 
                href="#services" 
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Услуги
              </Link>
              <Link 
                href="#strategy" 
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Стратегия
              </Link>
              <Link 
                href="#method" 
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Метод
              </Link>
              <Link 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 text-xs tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Записаться
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
