import { NextResponse } from "next/server"

const FORMSUBMIT_EMAIL = "nemytykh@icloud.com"
const AJAX_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()
  const phone = String(body.phone ?? "").trim()
  const message = String(body.message ?? "").trim()

  if (!name || !email) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  if (name.length > 200 || email.length > 320 || phone.length > 80 || message.length > 8000) {
    return NextResponse.json({ error: "too_long" }, { status: 400 })
  }

  const payload = {
    name,
    email,
    phone: phone || "—",
    message: message || "—",
    _subject: "Заявка с сайта Isabel Edu",
    _replyto: email,
    _captcha: false,
  }

  try {
    let res = await fetch(AJAX_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const fd = new FormData()
      fd.append("name", name)
      fd.append("email", email)
      fd.append("phone", phone || "—")
      fd.append("message", message || "—")
      fd.append("_subject", "Заявка с сайта Isabel Edu")
      fd.append("_replyto", email)
      fd.append("_captcha", "false")
      res = await fetch(AJAX_URL, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      })
    }

    const text = await res.text()
    if (!res.ok) {
      console.error("[contact] FormSubmit error", res.status, text.slice(0, 500))
      return NextResponse.json(
        { error: "formsubmit_rejected", status: res.status },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] FormSubmit fetch failed", err)
    return NextResponse.json({ error: "upstream_failed" }, { status: 502 })
  }
}
