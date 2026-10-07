import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <Link href="/" className="flex items-center">
            <Image src="/logo.gif" alt="stephdesign4u" width={120} height={48} className="h-auto opacity-80" />
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/stefania-draghici-stephdesign4u"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                aria-label="LinkedIn"
              >
                <Image src="/logos/linkedin.png" alt="" width={20} height={20} className="h-5 w-5 rounded-sm" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>

            {/* Portfolio Links */}
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://freelancer.com/u/stephdesign4u.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                <Image src="/logos/freelancer.jpg" alt="" width={24} height={18} className="h-[18px] w-auto" />
                <span>Freelancer</span>
                <ExternalLink size={14} />
              </a>
              <span className="text-muted-foreground/50">•</span>
              <a
                href="https://99designs.com/profiles/stephdesign4u"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                <Image src="/logos/99designs.png" alt="" width={20} height={20} className="h-5 w-5 rounded-sm" />
                <span>99designs</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center">© 2025 stephdesign4u. All rights reserved.</p>
      </div>
    </footer>
  )
}
