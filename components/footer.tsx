import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-16 bg-foreground text-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full border border-background/5" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full border border-background/5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo.svg"
                alt="Isabel Edu"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-background/70 leading-relaxed max-w-sm mb-6">
              Премиальное обучение английскому языку для русскоговорящих бизнес-лидеров,
              стремящихся к международному успеху.
            </p>
            {/* Social badges */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://t.me/isabeledu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-background/10 rounded-full text-sm hover:bg-background/20 transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://vk.com/isabeledu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-background/10 rounded-full text-sm hover:bg-background/20 transition-colors"
              >
                ВКонтакте
              </a>
              <span className="px-4 py-2 bg-background/10 rounded-full text-sm text-background/50">
                вы знаете какой грам
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6">Навигация</h4>
            <nav className="space-y-3">
              <Link href="#about" className="block text-background/70 hover:text-background transition-colors">
                О нас
              </Link>
              <Link href="#services" className="block text-background/70 hover:text-background transition-colors">
                Услуги
              </Link>
              <Link href="#strategy" className="block text-background/70 hover:text-background transition-colors">
                Стратегия
              </Link>
              <Link href="#method" className="block text-background/70 hover:text-background transition-colors">
                Метод
              </Link>
              <Link href="#contact" className="block text-background/70 hover:text-background transition-colors">
                Контакты
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6">Контакты</h4>
            <div className="space-y-3 text-background/70">
              <a href="mailto:nemytykh@icloud.com" className="block hover:text-background transition-colors">
                nemytykh@icloud.com
              </a>
              <a href="tel:+79017421090" className="block hover:text-background transition-colors">
                +7 (901) 742-10-90
              </a>
              <p>Москва / Онлайн</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Isabel Edu. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-background/50 hover:text-background transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
