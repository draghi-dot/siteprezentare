"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

// Real projects from portfolio
const generateProjects = () => {
  const projects: Array<{ id: string; title: string; category: string; image: string }> = []
  
  // Logo Design (8 images: be-1.jpg to be-8.jpg)
  for (let i = 1; i <= 8; i++) {
    projects.push({
      id: `logo-${i}`,
      title: `Logo Design ${i}`,
      category: "Logo",
      image: `/portfolio/logo/be-${i}.jpg`,
    })
  }
  
  // Corporate ID (23 images)
  const corporateIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  corporateIds.forEach((num, idx) => {
    projects.push({
      id: `corporate-id-${num}`,
      title: `Corporate Identity ${idx + 1}`,
      category: "Corporate ID",
      image: `/portfolio/corporate-id/be-id-${num}.jpg`,
    })
  })
  
  // Brochures (24 images: brochures-1.jpg to brochures-24.jpg, skipping 15)
  const brochureNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  brochureNums.forEach((num, idx) => {
    projects.push({
      id: `brochure-${num}`,
      title: `Brochure Design ${idx + 1}`,
      category: "Brochures",
      image: `/portfolio/brochures/brochures-${num}.jpg`,
    })
  })
  
  // Collateral Printed Materials
  const collateralFiles = [
    "be-p-1.jpg", "be-p-2.jpg", "be-p-3.jpg", "be-p-4.jpg", "be-p-5.jpg", 
    "be-p-6.jpg", "be-p-7.jpg", "be-p-8.jpg", "be-p-9.jpg", "be-p-10.jpg",
    "be-p-11.jpg", "be-p-12.jpg", "be-p-13.jpg", "be-p-14.jpg",
    "be-p26.jpg", "be-p27.jpg", "be-p28.jpg", "be-p29.jpg", "be-p30.jpg",
    "be-p31.jpg", "be-p32.jpg", "be-p33.jpg", "be-p34.jpg"
  ]
  collateralFiles.forEach((filename, idx) => {
    projects.push({
      id: `collateral-${idx + 1}`,
      title: `Print Material ${idx + 1}`,
      category: "Collateral",
      image: `/portfolio/collateral/${filename}`,
    })
  })
  
  // Web Design - Webpages
  const webpageNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  webpageNums.forEach((num, idx) => {
    projects.push({
      id: `webpage-${num}`,
      title: `Web Design ${idx + 1}`,
      category: "Web Design",
      image: `/portfolio/web-design/be-w-${num}.jpg`,
    })
  })
  
  // Web Design - Landing Pages
  for (let i = 15; i <= 28; i++) {
    projects.push({
      id: `landing-${i}`,
      title: `Landing Page ${i - 14}`,
      category: "Web Design",
      image: `/portfolio/web-design/landing-pages/be-w-${i}.jpg`,
    })
  }
  
  return projects
}

const projects = generateProjects()

const categories = ["All", "Logo", "Corporate ID", "Brochures", "Collateral", "Web Design"]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portofoliu" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">Selected Works</h2>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
