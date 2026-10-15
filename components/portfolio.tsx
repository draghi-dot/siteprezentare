"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { SectionHeading } from "@/components/reveal"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

// Real projects from portfolio
const portfolioGroups = [
  { category: "Books", folder: "books", label: "Book Design", files: ["01-ed-book.jpg", "02-ed-book.jpg", "03-ed-book.jpg", "04-ed-book.jpg", "05-ed-book-starlight.jpg", "pp4-la-and-math.jpg", "pp5-combined.jpg", "pp5-la.jpg", "pp5-math.jpg", "pp5-scinece.jpg", "pp5-social.jpg", "pp6-math.jpg", "pp6-science.jpg", "sp4-ability.jpg", "sp4-la.jpg", "sp4-math-new.jpg", "sp4-science.jpg", "sp5-ability.jpg", "sp6-ability-new.jpg", "sp6-la.jpg", "sp6-math.jpg", "test-pp5-math.jpg", "test-pp6-science.jpg", "test-pp6-social.jpg"] },
  { category: "Corporate ID", folder: "corporate-id", label: "Corporate Identity", files: ["be-id-1.jpg", "be-id-2.jpg", "be-id-3.jpg", "be-id-7.jpg", "be-id-17.jpg", "be-id-21.jpg", "be-id-22.jpg", "be-id-23.jpg", "logo-1.jpg", "logo-2.jpg", "logo-3.jpg"] },
  { category: "Collateral", folder: "collateral", label: "Print Material", files: ["be-p33.jpg", "be-p-5.jpg", "be-p-6.jpg", "be-p-10.jpg", "be-p-11.jpg", "be-p-14.jpg", "be-p-30.jpg", "brochures-6.jpg", "brochures-7.jpg", "brochures-10.jpg", "brochures-13.jpg", "brochures-14.jpg", "brochures-17.jpg", "brochures-18.jpg", "brochures-19.jpg", "brochures-20.jpg", "brochures-21.jpg", "brochures-23-b.jpg", "brochures-23.jpg", "brochures-24.jpg"] },
  { category: "Web Design", folder: "web-design", label: "Web Design", files: ["be-w-1.jpg", "be-w-2.jpg", "be-w-7.jpg", "be-w-8.jpg", "be-w-9.jpg", "be-w-10.jpg", "be-w-13.jpg", "be-w-14.jpg", "be-w-15-b.jpg", "be-w-15.jpg", "be-w-16.jpg", "be-w-18.jpg", "be-w-20.jpg", "be-w-21.jpg", "be-w-24.jpg"] },
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const filteredProjects = projects.filter((p) => p.category === activeCategory)

  // Track the visible slide; carousel is re-created per category (keyed), so start at 0
  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap())
    carouselApi.on("select", onSelect)
    carouselApi.on("reInit", onSelect)
    onSelect()
    return () => {
      carouselApi.off("select", onSelect)
      carouselApi.off("reInit", onSelect)
    }
  }, [carouselApi])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  // Keep the active thumbnail in view without scrolling the page
  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.children[currentIndex] as HTMLElement | undefined
    if (!strip || !thumb) return
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" })
  }, [currentIndex, activeCategory])

  // Lightbox navigation within the selected project's category
  const lightboxList = selectedProject ? projects.filter((p) => p.category === selectedProject.category) : []
  const lightboxIndex = selectedProject ? lightboxList.findIndex((p) => p.id === selectedProject.id) : -1

  const stepLightbox = useCallback(
    (dir: number) => {
      if (lightboxIndex < 0) return
      const next = (lightboxIndex + dir + lightboxList.length) % lightboxList.length
      setSelectedProject(lightboxList[next])
    },
    [lightboxIndex, lightboxList],
  )

  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") stepLightbox(1)
      if (e.key === "ArrowLeft") stepLightbox(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedProject, stepLightbox])

  return (
    <section id="portofoliu" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="portfolio" title="Selected Works" />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-6 py-2 text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "bg-foreground text-background shadow-lg md:scale-105"
                  : "bg-background text-muted-foreground hover:text-foreground border border-border hover:border-foreground md:hover:scale-105 active:scale-95"
              }`}
            >
              {category}
              <span className="ml-2 text-xs opacity-60">{projects.filter((p) => p.category === category).length}</span>
            </button>
          ))}
        </div>

        {/* One project at a time */}
        <div key={activeCategory} className="animate-fade-up">
          <Carousel opts={{ align: "start", loop: true, duration: 25 }} setApi={setCarouselApi} className="w-full">
            <CarouselContent className="-ml-0">
              {filteredProjects.map((project) => (
                <CarouselItem key={project.id} className="pl-0 basis-full">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group relative block w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-muted/40 cursor-zoom-in"
                    aria-label={`Open ${project.title}`}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="object-contain"
                    />
                    <span className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                      <Expand size={18} strokeWidth={1.5} />
                    </span>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => carouselApi?.scrollPrev()}
              className="p-3 border border-border bg-background hover:border-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>

            <p className="min-w-[4.5rem] text-center text-sm tracking-wider text-muted-foreground tabular-nums">
              <span className="text-foreground">{currentIndex + 1}</span> / {filteredProjects.length}
            </p>

            <button
              onClick={() => carouselApi?.scrollNext()}
              className="p-3 border border-border bg-background hover:border-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Thumbnails */}
          <div ref={thumbsRef} className="mt-6 flex gap-3 overflow-x-auto px-1 py-2 [scrollbar-width:thin]">
            {filteredProjects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`relative shrink-0 w-20 md:w-24 aspect-[4/3] overflow-hidden bg-muted transition-all duration-300 ${
                  index === currentIndex ? "ring-2 ring-foreground ring-offset-2 opacity-100" : "opacity-50 hover:opacity-90"
                }`}
                aria-label={`Show ${project.title}`}
              >
                <Image src={project.image || "/placeholder.svg"} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
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
              {lightboxList.length > 1 && (
                <>
                  <button
                    onClick={() => stepLightbox(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={() => stepLightbox(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs tracking-wider bg-background/80 backdrop-blur">
                    {lightboxIndex + 1} / {lightboxList.length}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
