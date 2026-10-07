"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Mail, MapPin, Send, CheckCircle, X, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Reveal, SectionHeading } from "@/components/reveal"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submitFormData = new FormData()
      submitFormData.append("name", formData.name)
      submitFormData.append("email", formData.email)
      submitFormData.append("message", formData.message)
      if (file) {
        submitFormData.append("file", file)
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: submitFormData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Show success message
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="contact us"
          title="Let's Collaborate"
          subtitle="Have a project in mind? Get in touch and let's turn your ideas into reality."
        />

        <Reveal className="grid md:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
          {/* Contact Info */}
          <div className="space-y-8 md:pt-8">
            <p className="font-serif text-2xl text-foreground leading-snug">
              Books, brands, campaigns or websites — tell me about your project.
            </p>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted text-foreground">
                <Mail size={20} className="text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Email</h3>
                <a
                  href="mailto:stephdesign4u@yahoo.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  stephdesign4u@yahoo.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted text-foreground">
                <MapPin size={20} className="text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Location</h3>
                <p className="text-muted-foreground">Remote - Worldwide</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5 bg-background border border-border p-6 md:p-10 shadow-sm">
            <div>
              <label htmlFor="contact-name" className="block mb-2 text-xs uppercase tracking-wider text-muted-foreground">Name</label>
              <Input
                type="text"
                id="contact-name"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background border-border focus:border-foreground transition-colors duration-300 h-11"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block mb-2 text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <Input
                type="email"
                id="contact-email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background border-border focus:border-foreground transition-colors duration-300 h-11"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block mb-2 text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <Textarea
                id="contact-message"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-background border-border focus:border-foreground resize-none transition-colors duration-300 min-h-36"
              />
            </div>
            
            {/* File Upload */}
            <div>
              <label className="block mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                Attach File (Optional)
              </label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground cursor-pointer transition-colors text-sm"
                >
                  <Paperclip size={16} />
                  <span>{file ? file.name : "Choose file"}</span>
                </label>
                {file && (
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {file && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded text-green-700">
                <CheckCircle size={20} />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </div>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 uppercase tracking-wider text-sm bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} className="ml-2" />
              </Button>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
