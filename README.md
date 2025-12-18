# Stephanie Design Portfolio Website

A modern, responsive portfolio website for graphic designer Stephanie, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, clean design with white theme
- 📱 Fully responsive
- 🖼️ Portfolio gallery with filtering
- 💼 Work experience section
- 💬 Client testimonials with project images
- 📧 Contact form with file upload
- ⚡ Fast and optimized

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Resend** - Email service
- **Radix UI** - Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

Get your Resend API key from [resend.com](https://resend.com)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `RESEND_API_KEY` environment variable
4. Deploy!

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/     # Contact form API route
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── about.tsx        # About section
│   ├── contact.tsx      # Contact form
│   ├── experience.tsx  # Work experience
│   ├── footer.tsx       # Footer
│   ├── header.tsx       # Navigation header
│   ├── hero.tsx         # Hero section
│   ├── portfolio.tsx    # Portfolio gallery
│   ├── services.tsx     # Services section
│   └── testimonials.tsx # Testimonials
└── public/
    └── portfolio/       # Portfolio images
```

## License

Private project - All rights reserved

