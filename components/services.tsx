export function Services() {
  const services = [
    {
      title: "Book & Editorial Design",
      description: "Conceptualised and designed interior layout and cover, tailored to specific target audiences and publisher guidelines. Manage complex typography hierarchies, handle final pre-print production or digital book.",
    },
    {
      title: "Corporate Identity",
      description: "Builds and maintains the visual image of a company or updates existing visual styles to fit modern market trends.",
    },
    {
      title: "Branding & Advertising",
      description: "Create visual identities and marketing campaigns that build brand recognition and customer awareness.",
    },
    {
      title: "Web Design",
      description: "Focuses on converting information architecture, wireframes and sitemaps into design elements that help the user navigate the platform logically and intuitively.",
    },
  ]

  return (
    <section id="servicii" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">what i do</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">Services</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background p-8 border border-border hover:border-foreground/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-default"
            >
              <h3 className="font-serif text-2xl font-medium text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

