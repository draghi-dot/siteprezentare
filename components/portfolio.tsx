"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import AutoHeight from "embla-carousel-auto-height"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Real projects from portfolio
const portfolioGroups = [
  { category: "Books", folder: "books", label: "Book Design", files: ["01-ed-book.jpg", "02-ed-book.jpg", "03-ed-book.jpg", "04-ed-book.jpg", "05-ed-book-starlight.jpg", "pp4-la-and-math.jpg", "pp5-combined.jpg", "pp5-la.jpg", "pp5-math.jpg", "pp5-scinece.jpg", "pp5-social.jpg", "pp6-math.jpg", "pp6-science.jpg", "sp4-ability.jpg", "sp4-la.jpg", "sp4-math-new.jpg", "sp4-science.jpg", "sp5-ability.jpg", "sp6-ability-new.jpg", "sp6-la.jpg", "sp6-math.jpg", "test-pp5-math.jpg", "test-pp6-science.jpg", "test-pp6-social.jpg"] },
  { category: "Corporate ID", folder: "corporate-id", label: "Corporate Identity", files: ["be-id-1.jpg", "be-id-2.jpg", "be-id-3.jpg", "be-id-7.jpg", "be-id-17.jpg", "be-id-21.jpg", "be-id-22.jpg", "be-id-23.jpg", "logo-1.jpg", "logo-2.jpg", "logo-3.jpg"] },
  { category: "Collateral", folder: "collateral", label: "Print Material", files: ["be-p33.jpg", "be-p-5.jpg", "be-p-6.jpg", "be-p-10.jpg", "be-p-11.jpg", "be-p-14.jpg", "be-p-30.jpg", "brochures-6.jpg", "brochures-7.jpg", "brochures-10.jpg", "brochures-13.jpg", "brochures-14.jpg", "brochures-17.jpg", "brochures-18.jpg", "brochures-19.jpg", "brochures-20.jpg", "brochures-21.jpg", "brochures-23-b.jpg", "brochures-23.jpg", "brochures-24.jpg"] },
  { category: "Web Design", folder: "web-design", label: "Web Design", files: ["be-w-1.jpg", "be-w-2.jpg", "be-w-5.jpg", "be-w-7.jpg", "be-w-8.jpg", "be-w-9.jpg", "be-w-10.jpg", "be-w-13.jpg", "be-w-14.jpg", "be-w-15-b.jpg", "be-w-15.jpg", "be-w-16.jpg", "be-w-18.jpg", "be-w-20.jpg", "be-w-21.jpg", "be-w-24.jpg"] },
]

const generateProjects = () =>
  portfolioGroups.flatMap((group) =>
    group.files.map((file, idx) => ({
      id: `${group.folder}-${idx + 1}`,
      title: `${group.label} ${idx + 1}`,
      category: group.category,
      image: `/portfolio/${group.folder}/${file}`,
    })),
  )

const projects = generateProjects()

const categories = portfolioGroups.map((group) => group.category)

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi>()

  // Group projects by category for mobile slides
  const projectsByCategory = categories.map((category) => ({
    category,
    projects: projects.filter((p) => p.category === category),
  }))

  useEffect(() => {
    if (!mobileCarouselApi) return

    const updateSlide = () => {
      const index = mobileCarouselApi.selectedScrollSnap()
      // Asigură-te că indexul este valid înainte de a accesa array-ul
      if (projectsByCategory[index]) {
        setActiveCategory(projectsByCategory[index].category)
      }
    }

    mobileCarouselApi.on("select", updateSlide)
    // Important: reInit ajută la recalcularea înălțimii la resize sau schimbări de orientare
    mobileCarouselApi.on("reInit", updateSlide) 
    updateSlide()

    return () => {
      mobileCarouselApi.off("select", updateSlide)
      mobileCarouselApi.off("reInit", updateSlide)
    }
  }, [mobileCarouselApi])

  const filteredProjects = projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portofoliu" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">Selected Works</h2>
        </div>

        {/* Desktop View - Grid */}
        <div className="hidden md:block">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background shadow-lg scale-105"
                    : "bg-background text-muted-foreground hover:text-foreground border border-border hover:border-foreground hover:scale-105 active:scale-95"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer rounded-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/70 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-center text-background transform translate-y-2 group-hover:translate-y-0">
                    <h3 className="font-serif text-xl mb-1">{project.title}</h3>
                    <p className="text-sm uppercase tracking-wider opacity-90">{project.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile View - Category Buttons and Carousel */}
        <div className="md:hidden">
          {/* Category Buttons - Always visible */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  const categoryIndex = categories.indexOf(category)
                  mobileCarouselApi?.scrollTo(categoryIndex)
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 border rounded ${
                  activeCategory === category
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Carousel with Projects */}
          <div className="relative w-full">
            <Carousel
              plugins={[
                AutoHeight() as any
              ]}
              opts={{
                align: "start",
                loop: false,
                duration: 20,
              }}
              setApi={setMobileCarouselApi}
              className="w-full"
            >
              {/* items-start este CRUCIAL aici. Fără el, toate slide-urile se întind la maxim */}
              <CarouselContent className="-ml-0 items-start">
                {projectsByCategory.map((categoryGroup) => (
                  <CarouselItem key={categoryGroup.category} className="pl-0 basis-full">
                    <div className="w-full px-2">
                      {/* Projects Grid for this category - auto height based on content */}
                      <div className="space-y-4 pb-4">
                        {categoryGroup.projects.map((project) => (
                          <button
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="w-full relative aspect-[4/3] overflow-hidden bg-muted rounded-lg"
                          >
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent text-background p-3">
                              <h4 className="font-serif text-sm font-medium">{project.title}</h4>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Category Buttons - Also at the bottom */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    const categoryIndex = categories.indexOf(category)
                    mobileCarouselApi?.scrollTo(categoryIndex)
                  }}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 border rounded ${
                    activeCategory === category
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </VisuallyHidden>
          {selectedProject && (
            <div className="relative w-full h-[90vh] bg-muted">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-contain"
                sizes="95vw"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
