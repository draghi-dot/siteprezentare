"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Real testimonials from clients with matching project images
const testimonials = [
  {
    id: 1,
    text: "Stefanie brought my visions to life for 2 projects in ways that felt personal, powerful, and polished. She designed the cover for When Trauma Is Your Author and the full layout for the companion journal. Both projects carried emotional weight, and Stefanie handled them with creativity, care, and professionalism. She was timely, responsive, and deeply invested in making sure every detail aligned with my message. If you're looking for a designer who truly gets it and knows how to deliver excellence, Stefanie is the one.",
    author: "Nikguan Lewis",
    role: "Speaker, Therapist, Consultant – Texas, United States",
    projectImage: "/portfolio/collateral/be-p-1.jpg", // Book cover design
    projectType: "Book Design",
  },
  {
    id: 2,
    text: "Remarkable - astounding - impeccable - Stefania - were the Ebooks Stefania did for me. As one of the rare few designated by National Speakers Association with the highest earned designation, Certified Speaking Professional, since you have professional as your last name you recognize other professionals. Stefani is definitely a Graphic Design Professional specializing in Book Design. Between providing exactly what the printer wants and navigating the changing eBook formatting environment Stefani stewards my books and I am grateful to her.",
    author: "John Meluso CSP",
    role: "President at NSANM - Albuquerque, New Mexico, United States",
    projectImage: "/portfolio/collateral/be-p-2.jpg", // eBook design
    projectType: "eBook Design",
  },
  {
    id: 3,
    text: "I thought it was time for a slight change of the company image. I wanted a redesigned logo and a web page to represent better what the company has become in time. Everything became easy once I received the creative brief form Stefania. From that moment it was a pleasure to work on it. I appreciated the professional and yet discreet approach, with the right guidance for the best results while keeping the message unaltered. A deep understanding of the direction and an expression of the new identity which exceeded my expectations.",
    author: "Magda Gales",
    role: "Owner, CND International – Bucharest, Romania",
    projectImage: "/portfolio/web-design/be-w-1.jpg", // Web design + logo
    projectType: "Logo & Web Design",
  },
  {
    id: 4,
    text: "I've had the pleasure to work with Stefania for many years and I have enjoyed her expertise in the conceptualization and design of a variety of visual communications materials. In addition to core graphic design skills such as knowledge about colour and composition, Stefania has a unique blend of artistic sensibility, technical skills, and project management that enable her to effectively translate business ideas into an end product that the client will absolutely love.",
    author: "Nina Trifan",
    role: "Publisher Author – Toronto, Canada",
    projectImage: "/portfolio/collateral/be-p-3.jpg", // Visual communications
    projectType: "Visual Communications",
  },
  {
    id: 5,
    text: "Stephanie created the logo for Apprana, an upcoming business venture of mine. She was such a pleasure to work with, and always went the extra mile to make sure that I was happy with her work. She's a talented and creative designer, and a really nice person, too. I'm grateful for the work that she did for me, and I would not hesitate to work with her again.",
    author: "Vivek Chawla",
    role: "Director Of Product Management at Salesforce – Carlsbad, California, United States",
    projectImage: "/portfolio/logo/be-1.jpg", // Logo design for Apprana
    projectType: "Logo Design",
  },
  {
    id: 6,
    text: "We were starting a project for development of the identity of our new company and we needed somebody who can help us growing our ideas from the ground up and still be flexible and affordable as for a young enterprise. Then, we met Stefania and we found out that not only she is willing to work with us but also she helped us to develop our ideas and clarify our goals and she did it in the most professional way.",
    author: "Bogdan Nenu",
    role: "Senior Software Engineer – Bucharest, Romania",
    projectImage: "/portfolio/corporate-id/be-id-1.jpg", // Corporate identity
    projectType: "Corporate Identity",
  },
  {
    id: 7,
    text: "Stephanie is an outstanding graphic designer who firstly captured our vision and was able to see where we wanted to go. Secondly, she provided creative and intelligent solutions with an insight into our customer base which is rare. Thirdly, she responded immediately to our requests for amendments, always within 24hours, and in a project of this size that was not an easy feat providing unlimited revisions as she promised.",
    author: "Mark H.",
    role: "Kuala Lumpur, Malaysia",
    projectImage: "/portfolio/brochures/brochures-1.jpg", // Large project materials
    projectType: "Branding Project",
  },
  {
    id: 8,
    text: "Stephanie is an outstanding graphic designer with over 10 years industry experience that shows in and how she works. She is a true professional producing highly professional and original work. She followed my instructions perfectly & was always on time. In an competitive environment of designers, in my opinion she is miles ahead. Without doubt I will ask her to do more projects for my business and I will be recommending her to all my business colleagues and friends.",
    author: "Ann B.",
    role: "Australia",
    projectImage: "/portfolio/collateral/be-p-4.jpg", // Professional work
    projectType: "Graphic Design",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section id="testimoniale" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">testimonial</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">What Clients Say</h2>
        </div>

        <div className="relative">
          <Quote className="w-16 h-16 text-muted-foreground/20 mx-auto mb-8" />

          <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
            {/* Project Image */}
            {current.projectImage && (
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden order-2 md:order-1">
                <Image
                  src={current.projectImage}
                  alt={current.projectType || "Project"}
                  fill
                  className="object-cover"
                />
                {current.projectType && (
                  <div className="absolute bottom-0 left-0 right-0 bg-foreground/80 text-background p-3 text-center">
                    <p className="text-sm font-medium">{current.projectType}</p>
                  </div>
                )}
              </div>
            )}

            {/* Testimonial Text */}
            <blockquote className="text-center md:text-left order-1 md:order-2">
              <p className="text-base md:text-lg lg:text-xl font-serif leading-relaxed mb-6 text-pretty text-foreground">
                {`"${current.text}"`}
              </p>
              <footer>
                <p className="font-medium text-base text-foreground">{current.author}</p>
                <p className="text-muted-foreground text-sm">{current.role}</p>
              </footer>
            </blockquote>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 border border-border hover:border-foreground hover:bg-muted transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-foreground w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 border border-border hover:border-foreground hover:bg-muted transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
