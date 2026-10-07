import { BookOpen, Building2, Megaphone, MonitorSmartphone } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/reveal"

export function Services() {
  const services = [
    {
      title: "Book & Editorial Design",
      icon: BookOpen,
      description: "Conceptualised and designed interior layout and cover, tailored to specific target audiences and publisher guidelines. Manage complex typography hierarchies, handle final pre-print production or digital book.",
    },
    {
      title: "Corporate Identity",
      icon: Building2,
      description: "Builds and maintains the visual image of a company or updates existing visual styles to fit modern market trends.",
    },
    {
      title: "Branding & Advertising",
      icon: Megaphone,
      description: "Create visual identities and marketing campaigns that build brand recognition and customer awareness.",
    },
    {
      title: "Web Design",
      icon: MonitorSmartphone,
      description: "Focuses on converting information architecture, wireframes and sitemaps into design elements that help the user navigate the platform logically and intuitively.",
    },
  ]

  return (
    <section id="servicii" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="what i do" title="Services" />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={index * 100}>
                <div className="group h-full bg-background p-8 md:p-10 border border-border transition-all duration-300 hover:border-foreground/40 hover:shadow-md">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-muted text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="font-serif text-4xl text-muted-foreground/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
