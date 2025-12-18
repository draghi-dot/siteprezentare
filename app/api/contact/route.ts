import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File | null

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare email content
    const emailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
${file ? `\nAttachment: ${file.name} (${(file.size / 1024).toFixed(2)} KB)` : ""}
    `.trim()

    // Prepare attachments if file exists
    const attachments = []
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      attachments.push({
        filename: file.name,
        content: buffer,
      })
    }

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>", // Update with your verified domain
        to: ["stephdesign4u@yahoo.com"],
        replyTo: email,
        subject: `Contact Form: ${name}`,
        text: emailBody,
        ...(attachments.length > 0 && { attachments }),
      })

      if (error) {
        console.error("Resend error:", error)
        return NextResponse.json(
          { error: "Failed to send email. Please try again later." },
          { status: 500 }
        )
      }

      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
          hasAttachment: attachments.length > 0,
        },
        { status: 200 }
      )
    } catch (resendError) {
      console.error("Resend API error:", resendError)
      // Fallback: if Resend is not configured, return success but log the data
      // In production, make sure RESEND_API_KEY is set in environment variables
      if (!process.env.RESEND_API_KEY) {
        console.log("RESEND_API_KEY not configured. Email data:", {
          to: "stephdesign4u@yahoo.com",
          from: email,
          subject: `Contact Form: ${name}`,
          message: emailBody,
          hasAttachment: attachments.length > 0,
        })
        return NextResponse.json(
          {
            success: true,
            message: "Message received! (Email service not configured - check console)",
            hasAttachment: attachments.length > 0,
          },
          { status: 200 }
        )
      }
      throw resendError
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}

