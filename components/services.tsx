export function Services() {
  const services = [
    {
      title: "Logo Design",
      description: "I create unique and memorable logos that reflect your brand identity.",
    },
    {
      title: "Corporate Identity",
      description: "I develop complete corporate identities, from logo to branding materials.",
    },
    {
      title: "Book & eBook Design",
      description: "I design professional books and eBooks, from cover to interior layout.",
    },
    {
      title: "Web Design",
      description: "I create modern and functional websites, including landing pages and UI design.",
    },
    {
      title: "Brochures & Print Materials",
      description: "I design printed materials: brochures, flyers, catalogs and promotional materials.",
    },
    {
      title: "Branding & Advertising",
      description: "I create complete advertising campaigns and promotional materials for various platforms.",
    },
  ]

  return (
    <section id="servicii" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">what i do</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">Services</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

