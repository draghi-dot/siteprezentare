import Image from "next/image"

export function Hero() {
  return (
    <section id="acasa" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden bg-white">
      {/* Home background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Graphic Designer</p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-8 text-balance">
          Stephanie Design
        </h1>
        <div className="space-y-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-left leading-relaxed">
          <p>
            Graphic Designer with <strong>17+ years of experience</strong> in remote projects for US-based, Australia, and Canada clients.
          </p>
          <p>
            Specialised in <strong>advertising & promotional campaigns/materials</strong>, <strong>book and eBook design</strong>, <strong>UI design</strong>, and <strong>customised solutions</strong>.
          </p>
          <p>
            Proven skills in managing complex projects, cross-cultural communication, and meeting deadlines using <strong>Figma</strong> and <strong>Adobe Creative Suite</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}
