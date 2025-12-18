import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_GQ6AkdcP_MgiG1bZq8PZKm5vc72QhrnVB"
const resend = new Resend(RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log("=== Contact API Route Called ===")
  
  try {
    console.log("Parsing form data...")
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File | null

    console.log("Form data received:", {
      name: name ? "✓" : "✗",
      email: email ? "✓" : "✗",
      message: message ? "✓" : "✗",
      file: file ? `✓ (${file.name}, ${file.size} bytes)` : "✗",
    })

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Validation failed: Missing required fields", { name: !!name, email: !!email, message: !!message })
      return NextResponse.json(
        { error: "Missing required fields", details: { name: !!name, email: !!email, message: !!message } },
        { status: 400 }
      )
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
    const attachments: Array<{ filename: string; content: Buffer }> = []
    if (file && file.size > 0) {
      try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        attachments.push({
          filename: file.name || "attachment",
          content: buffer,
        })
      } catch (fileError) {
        console.error("Error processing file attachment:", fileError)
        // Continue without attachment if there's an error
      }
    }

    // Send email using Resend
    try {
      // Recipient email - can be overridden via environment variable
      const recipientEmail = process.env.RESEND_RECIPIENT_EMAIL || "stephdesign4u@yahoo.com"
      // From email - after verifying domain at resend.com/domains, update this
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>"
      
      const emailPayload: {
        from: string
        to: string[]
        replyTo: string
        subject: string
        text: string
        attachments?: Array<{ filename: string; content: Buffer }>
      } = {
        from: fromEmail,
        to: [recipientEmail],
        replyTo: email,
        subject: `Contact Form: ${name}`,
        text: emailBody,
      }
      
      console.log("Email configuration:", {
        from: fromEmail,
        to: recipientEmail,
        usingEnvRecipient: !!process.env.RESEND_RECIPIENT_EMAIL,
        usingEnvFrom: !!process.env.RESEND_FROM_EMAIL,
      })

      // Add attachments if present
      if (attachments.length > 0) {
        emailPayload.attachments = attachments
      }

      console.log("Sending email with payload:", {
        from: emailPayload.from,
        to: emailPayload.to,
        subject: emailPayload.subject,
        hasAttachments: attachments.length > 0,
        apiKeyPresent: !!RESEND_API_KEY,
      })

      if (!RESEND_API_KEY || RESEND_API_KEY === "") {
        throw new Error("Resend API key is not configured")
      }

      const result = await resend.emails.send(emailPayload)
      
      const { data, error } = result
      
      console.log("Resend response:", { data: data?.id, error: error ? JSON.stringify(error) : null })

      if (error) {
        console.error("Resend error:", JSON.stringify(error, null, 2))
        
        // Handle specific Resend validation errors
        if (error.statusCode === 403 && error.name === "validation_error") {
          console.error("Resend domain verification required. Error:", error.message)
          return NextResponse.json(
            { 
              error: "Email service configuration issue. Please contact the site administrator.",
              details: "Domain verification required in Resend. For testing, emails can only be sent to the account owner's email address.",
              code: "RESEND_DOMAIN_REQUIRED"
            },
            { status: 500 }
          )
        }
        
        // Return more detailed error for debugging
        return NextResponse.json(
          { 
            error: "Failed to send email. Please try again later.",
            details: error.message || "Unknown error",
            code: error.name || "UNKNOWN_ERROR"
          },
          { status: 500 }
        )
      }

      console.log("Email sent successfully:", data?.id)

      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
          hasAttachment: attachments.length > 0,
        },
        { status: 200 }
      )
    } catch (resendError: any) {
      console.error("Resend API error:", resendError)
      console.error("Error details:", JSON.stringify(resendError, null, 2))
      
      // Return error with more details
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          details: resendError?.message || "Unknown error occurred"
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    // Comprehensive error logging
    console.error("=== TOP-LEVEL ERROR IN CONTACT API ===")
    console.error("Error type:", error?.constructor?.name || typeof error)
    console.error("Error message:", error?.message || "No message")
    console.error("Error stack:", error?.stack || "No stack trace")
    console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    console.error("=====================================")
    
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again.",
        details: error?.message || "Unknown error occurred",
        type: error?.constructor?.name || typeof error,
      },
      { status: 500 }
    )
  }
}

