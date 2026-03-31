"use client"

import { useState } from "react"
import { Send, Mail, Phone, MapPin, Calendar, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/nemytykh@icloud.com"

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
]

function DatePicker({ selectedDate, onSelect }: { selectedDate: Date | null; onSelect: (date: Date) => void }) {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date())

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
  const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1

    const days: (Date | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const days = getDaysInMonth(currentMonth)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true
    return date < today
  }

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  return (
    <div className="bg-background rounded-2xl p-4 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-serif text-lg">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <button
            key={index}
            type="button"
            disabled={isDateDisabled(date)}
            onClick={() => date && onSelect(date)}
            className={`
              p-2 text-sm rounded-xl transition-all
              ${!date ? 'invisible' : ''}
              ${isDateDisabled(date) ? 'text-muted-foreground/30 cursor-not-allowed' : 'hover:bg-primary/10 hover:text-primary'}
              ${isDateSelected(date) ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}
            `}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>
    </div>
  )
}

function TimePicker({ selectedTime, onSelect }: { selectedTime: string | null; onSelect: (time: string) => void }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {timeSlots.map(time => (
        <button
          key={time}
          type="button"
          onClick={() => onSelect(time)}
          className={`
            py-2.5 px-3 text-sm rounded-xl transition-all border
            ${selectedTime === time
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }
          `}
        >
          {time}
        </button>
      ))}
    </div>
  )
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  function formatDate(date: Date | null) {
    if (!date) return ""
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("idle")
    setSubmitting(true)
    try {
      const messageParts: string[] = []
      if (formData.message.trim()) {
        messageParts.push(formData.message.trim())
      }
      if (selectedDate) {
        messageParts.push(`Предпочтительная дата: ${formatDate(selectedDate)}`)
      }
      if (selectedTime) {
        messageParts.push(`Предпочтительное время: ${selectedTime}`)
      }
      const bodyText = messageParts.length > 0 ? messageParts.join("\n\n") : "—"

      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "—",
          message: bodyText,
          _subject: "Заявка с сайта Isabel Edu",
          _replyto: formData.email.trim(),
          _captcha: false,
        }),
      })
      if (!res.ok) {
        throw new Error(`FormSubmit: ${res.status}`)
      }
      setFormStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setSelectedDate(null)
      setSelectedTime(null)
    } catch {
      setFormStatus("error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-muted/30 rounded-r-[100px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Side - Info */}
          <div className="lg:col-span-2">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">
              Контакты
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              Начните свой путь к
              <span className="italic text-primary"> совершенству</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Оставьте заявку на бесплатную консультацию. Мы обсудим ваши цели
              и подберём оптимальную программу обучения.
            </p>

            {/* Contact Info */}
            <div className="space-y-5">
              <a href="mailto:nemytykh@icloud.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-foreground group-hover:text-primary transition-colors">
                    nemytykh@icloud.com
                  </p>
                </div>
              </a>

              <a href="tel:+79017421090" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Телефон</p>
                  <p className="text-foreground group-hover:text-primary transition-colors">
                    +7 (901) 742-10-90
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Локация</p>
                  <p className="text-foreground">
                    Москва / Онлайн
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <div className="bg-background p-8 lg:p-10 rounded-3xl shadow-xl border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all rounded-xl"
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all rounded-xl"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all rounded-xl"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Комментарий
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-y min-h-[88px] px-4 py-3.5 bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all rounded-xl"
                    placeholder="Цели, уровень, удобный способ связи…"
                  />
                </div>

                {/* Date Selection */}
                <div>
                  <label className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    Выберите удобную дату
                  </label>
                  <DatePicker selectedDate={selectedDate} onSelect={setSelectedDate} />
                  {selectedDate && (
                    <p className="mt-2 text-sm text-primary">
                      Выбрано: {formatDate(selectedDate)}
                    </p>
                  )}
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="animate-fade-in">
                    <label className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      Выберите время
                    </label>
                    <TimePicker selectedTime={selectedTime} onSelect={setSelectedTime} />
                  </div>
                )}

                {formStatus === "success" && (
                  <p className="text-sm text-primary border border-primary/30 bg-primary/5 rounded-xl px-4 py-3" role="status">
                    Спасибо за заявку! Мы свяжемся с вами в ближайшее время.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-sm text-destructive border border-destructive/30 bg-destructive/5 rounded-xl px-4 py-3" role="alert">
                    Не удалось отправить. Проверьте соединение или напишите на nemytykh@icloud.com.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 disabled:opacity-60 disabled:pointer-events-none disabled:hover:scale-100"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                      Отправка…
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
