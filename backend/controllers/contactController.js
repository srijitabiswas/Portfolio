/**
 * Sends the contact-form message as a real email using Resend's REST API.
 * Uses native fetch — no extra npm package needed.
 *
 * Setup (one-time):
 *   1. Sign up free at https://resend.com (no credit card needed)
 *   2. Dashboard → API Keys → create one → copy it
 *   3. Add to backend/.env:
 *        RESEND_API_KEY=re_xxxxxxxxxxxx
 *        CONTACT_EMAIL=youremail@gmail.com   (where messages should arrive)
 *
 * No domain verification needed — Resend's free tier lets you send from
 * its shared "onboarding@resend.dev" address straight to your own inbox,
 * which is exactly what a portfolio contact form needs.
 */
export async function sendContactMessage(req, res) {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Name, email, and message are all required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL],
        reply_to: email,
        subject: `New message from ${name} (Portfolio Contact Form)`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
            <hr style="margin-top:24px;border:none;border-top:1px solid #eee;" />
            <p style="color:#888;font-size:12px;">
              Reply directly to this email to respond to ${escapeHtml(name)} —
              the Reply-To is already set to their address.
            </p>
          </div>
        `,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.json().catch(() => ({}));
      console.error("Resend API error:", errBody);
      return res.status(502).json({ message: "Failed to send the message. Please try again shortly." });
    }

    res.json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong sending your message." });
  }
}

/** Minimal HTML-escaping so a visitor can't inject markup/scripts into the email body. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}