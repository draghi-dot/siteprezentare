import { Briefcase, MapPin, Calendar, Building2 } from "lucide-react"
import Image from "next/image"

const experiences = [
  {
    id: 1,
    title: "Independent Creative Artist",
    company: "stephdesign4u",
    companyLogo: "/logo.gif",
    employmentType: "Freelance",
    location: "Bucharest, Bucharest, Romania",
    period: "Jan 2007 - Present",
    duration: "19 yrs",
    description: "stephdesign4u is my freelancer brand - with over 18 years of experience for 50+ global clients and hundreds of completed projects across multiple industries.",
    responsibilities: [
      "Design and develop complete brand identities including logos, corporate identity systems, and brand guidelines",
      "Create professional book and eBook designs from concept to final print-ready files",
      "Design responsive websites, landing pages, and UI/UX interfaces using Figma and Adobe Creative Suite",
      "Develop advertising campaigns and promotional materials for print and digital platforms",
      "Manage complex projects with cross-cultural teams, ensuring timely delivery and client satisfaction",
      "Work with clients from US, Australia, Canada, and Europe, adapting to different time zones and communication styles",
    ],
  },
  {
    id: 2,
    title: "Graphic Designer",
    company: "Artblox",
    companyLogo: "/artblox-logo.webp",
    employmentType: "Freelance",
    location: "New York, United States · Remote",
    period: "Oct 2017 - Jan 2024",
    duration: "6 yrs 4 mos",
    description: "",
    responsibilities: [
      "Created 100+ new designs available for customisation for North American market on etsy and amazon",
      "Manage up to 300 orders daily including downloading order's reports, customise and prepared files",
    ],
  },
  {
    id: 3,
    title: "Graphic Designer",
    company: "CONNEX Romania",
    companyLogo: "/vodafone-logo.png", // CONNEX GSM was later acquired by Vodafone
    employmentType: "Full-time",
    location: "Bucharest, Romania · On-site",
    period: "Feb 1998 - Oct 2002",
    duration: "4 yrs 9 mos",
    description: "Part of In-House Creative Agency Team, I had a Creative role to create advertising & promotional campaigns and to produce high quality marketing materials; keep close communication with Marketing Team and tra",
    responsibilities: [],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">Work Experience</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="border-l-2 border-border pl-6 pb-8 relative hover:border-foreground/40 transition-colors duration-300"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-foreground border-2 border-white" />

              {/* Content */}
              <div className="space-y-4">
                {/* Title and Company */}
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden">
                    {exp.companyLogo ? (
                      <Image
                        src={exp.companyLogo}
                        alt={exp.company}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    ) : (
                      <Building2 size={32} className="text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-foreground/60" />
                        <span className="font-medium text-foreground">{exp.company}</span>
                        {exp.employmentType && (
                          <span className="text-sm px-2 py-0.5 bg-muted rounded">{exp.employmentType}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-foreground/60" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-foreground/60" />
                        <span>{exp.period}</span>
                        {exp.duration && <span className="text-sm">• {exp.duration}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {exp.description && (
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                )}

                {/* Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                          <span className="text-foreground mt-1.5">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

