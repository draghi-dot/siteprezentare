# Deployment Guide for Vercel

## Prerequisites

1. A GitHub account (or GitLab/Bitbucket)
2. A Vercel account (free tier works great)
3. A Resend account for email functionality (optional but recommended)

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create a repository on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Configure environment variables (see below)
6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? graphic-designer-website (or your choice)
# - Directory? ./
# - Override settings? No
```

### 3. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variable:

```
RESEND_API_KEY = re_your_api_key_here
```

**To get Resend API Key:**
- Go to [resend.com](https://resend.com)
- Sign up for a free account
- Go to API Keys section
- Create a new API key
- Copy and paste it in Vercel

### 4. Update Resend Domain (Important!)

After deploying, you need to:

1. Go to Resend dashboard → Domains
2. Add and verify your domain, OR
3. Update the `from` email in `app/api/contact/route.ts` to use a verified domain

**Quick fix for testing:**
- Use Resend's test domain: `onboarding@resend.dev` (already in code)
- For production, add your own domain

### 5. Redeploy After Environment Variables

After adding environment variables:
- Go to **Deployments** tab
- Click the three dots on the latest deployment
- Click **Redeploy**

## Post-Deployment Checklist

- [ ] Site is accessible at your Vercel URL
- [ ] All images load correctly
- [ ] Contact form works (test it!)
- [ ] Navigation links work
- [ ] Portfolio images display properly
- [ ] Testimonials carousel works

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically configure SSL

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure `next.config.mjs` is correct
- Check build logs in Vercel dashboard

### Email Not Working
- Verify `RESEND_API_KEY` is set in environment variables
- Check Resend dashboard for email logs
- Ensure domain is verified in Resend (or use test domain)

### Images Not Loading
- Check that images are in `public` folder
- Verify image paths in components
- Check browser console for 404 errors

## Support

For issues:
- Vercel Docs: https://vercel.com/docs
- Resend Docs: https://resend.com/docs

