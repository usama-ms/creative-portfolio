import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Your email address where you want to receive contact form submissions
const RECIPIENT_EMAIL = process.env.RESEND_RECIPIENT_EMAIL || "usama.ahmad00033@gmail.com"
// The "from" email address (must be verified in Resend)
const FROM_EMAIL = "onboarding@resend.dev"

// Helper function to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      )
    }

    // Escape user input to prevent XSS
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>")

    // Send notification email to recipient (you)
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: email, // Allow direct replies to the sender
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
              <div style="margin-bottom: 20px;">
                <strong style="color: #667eea; display: block; margin-bottom: 5px;">Name:</strong>
                <p style="margin: 0; color: #333;">${safeName}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #667eea; display: block; margin-bottom: 5px;">Email:</strong>
                <p style="margin: 0; color: #333;">
                  <a href="mailto:${safeEmail}" style="color: #667eea; text-decoration: none;">${safeEmail}</a>
                </p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #667eea; display: block; margin-bottom: 5px;">Subject:</strong>
                <p style="margin: 0; color: #333;">${safeSubject}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #667eea; display: block; margin-bottom: 5px;">Message:</strong>
                <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; color: #333; white-space: pre-wrap;">${safeMessage}</div>
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background: #e8f4f8; border-radius: 5px; border-left: 4px solid #667eea;">
                <p style="margin: 0; color: #333; font-style: italic;">
                  <strong>Note:</strong> Please respond to this inquiry. You can reply directly to this email to contact ${safeName}.
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
                <p style="margin: 0;">This email was sent from your portfolio contact form.</p>
                <p style="margin: 5px 0 0 0;">Timestamp: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Note: Please respond to this inquiry. You can reply directly to this email to contact ${name}.

This email was sent from your portfolio contact form.
Timestamp: ${new Date().toLocaleString()}
      `.trim(),
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      )
    }

    console.log("Email sent successfully:", data)

    return NextResponse.json(
      { message: "Message sent successfully!", id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}

