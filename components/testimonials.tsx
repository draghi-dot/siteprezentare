"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Real testimonials from clients
const testimonials = [
  {
    id: 1,
    text: "Stefanie brought my visions to life for 2 projects in ways that felt personal, powerful, and polished. She designed the cover for When Trauma Is Your Author and the full layout for the companion journal. Both projects carried emotional weight, and Stefanie handled them with creativity, care, and professionalism. She was timely, responsive, and deeply invested in making sure every detail aligned with my message. If you're looking for a designer who truly gets it and knows how to deliver excellence, Stefanie is the one.",
    author: "Nikguan Lewis",
    role: "Speaker, Therapist, Consultant – Texas, United States",
  },
  {
    id: 2,
    text: "Remarkable - astounding - impeccable - Stefania - were the Ebooks Stefania did for me. As one of the rare few designated by National Speakers Association with the highest earned designation, Certified Speaking Professional, since you have professional as your last name you recognise other professionals. Stefani is definitely a Graphic Design Professional specialising in Book Design. Between providing exactly what the printer wants and navigating the changing eBook formatting environment Stefani stewards my books and I am grateful to her. She continues to grow and expand, learning new things and I am excited that we are putting our minds together for a new creation, video books - we have audio books why not video books that are true hybrids that even include text. On one final note, Stefani has a true generous heart that not only takes care of clients as if they are family, she is quite affordable. Don't mistake affordability with less than professional work. Thankfully, not only is she affordable, her efficiency and productivity allows for her great prices as well. I give Stefania six stars on a five star rating system.",
    author: "John Meluso CSP",
    role: "President 2011-2012 at NSANM – Albuquerque, New Mexico, United States",
  },
  {
    id: 3,
    text: "Stephanie is an outstanding graphic designer who firstly captured our vision and was able to see where we wanted to go. Secondly, she provided creative and intelligent solutions with an insight into our customer base which is rare. Thirdly, she responded immediately to our requests for amendments, always within 24hours, and in a project of this size that was not an easy feat providing unlimited revisions as she promised.",
    author: "Mark Holmes",
    role: "University of Kuala Lumpur, Malaysia",
  },
  {
    id: 4,
    text: "I've had the pleasure to work with Stefania for many years and I have enjoyed her expertise in the conceptualization and design of a variety of visual communications materials. In addition to core graphic design skills such as knowledge about colour and composition, Stefania has a unique blend of artistic sensibility, technical skills, and project management that enable her to effectively translate business ideas into an end product that the client will absolutely love. Not only does she communicate effectively with clients, managers, and co-workers, but she also knows how to keep teams on track to deliver projects within a set budget. I am also impressed with her aptitude in learning new technologies and her desire to further her education. I firmly believe that Stefania is a great asset for any organization that is looking for skilled graphic designers who love a good challenge.",
    author: "Nina Trifan",
    role: "Publisher Author – Toronto, Canada",
  },
  {
    id: 5,
    text: "I thought it was time for a slight change of the company image. I wanted a redesigned logo and a web page to represent better what the company has become in time. I found it most difficult to understand what exactly I wanted to express through that change. Everything became easy once I received the creative brief form Stefania. From that moment it was a pleasure to work on it. I appreciated the professional and yet discreet approach, with the right guidance for the best results while keeping the message unaltered. A deep understanding of the direction and an expression of the new identity which exceeded my expectations. I didn't know exactly what I was looking for but the result delights me. They keep their promises!",
    author: "Magda Gales",
    role: "Founder, CND International Insurance Brokers – Bucharest, Romania",
  },
  {
    id: 6,
    text: "Stephanie is an outstanding graphic designer with over 20 years industry experience that shows in and how she works. She is a true professional producing highly professional and original work. She followed my instructions perfectly & was always on time. In a competitive environment of designers, in my opinion she is miles ahead. Without doubt I will ask her to do more projects for my business and I will be recommending her to all my business colleagues and friends.",
    author: "Samatha Mackay",
    role: "Founder I Wish Wedding – Adelaide, Australia",
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

          <blockquote className="text-center max-w-3xl mx-auto">
            <p className="text-base md:text-lg lg:text-xl font-serif leading-relaxed mb-6 text-pretty text-foreground">
              {`"${current.text}"`}
            </p>
            <footer>
              <p className="font-medium text-base text-foreground">{current.author}</p>
              <p className="text-muted-foreground text-sm">{current.role}</p>
            </footer>
          </blockquote>

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
