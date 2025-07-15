# Silber Arrows Website - Next.js Version

This repository contains the **modernized Next.js version** of the Silber Arrows website, a premium Mercedes-Benz service center in Dubai. The project has been completely converted from a static HTML website to a modern React-based Next.js application.

## 🚀 Live Site

The website can be viewed at: [Your deployment URL here]

## 🔄 Conversion Overview

### What Was This Built On Originally?

The original website was a **static HTML website** with:
- Pure HTML files (`index.html`, `extended-warranty.html`, `service-contracts.html`)
- Plain CSS (`style.css`, `service-page.css`)
- Vanilla JavaScript (`main.js`)
- External CDN dependencies (Font Awesome, Google Fonts)
- Cloudinary for image hosting
- GitHub Pages for hosting
- Basic build process creating minified files

### What It's Built On Now

The modernized Next.js version uses:
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **React 18** with modern hooks
- **CSS Modules** with custom design system
- **Next.js Image optimization**
- **Modern build tooling** (Webpack, etc.)
- **Font optimization** with next/font
- **SEO optimizations** with Next.js metadata API

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Image Hosting**: Cloudinary
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with design system
│   ├── layout.tsx           # Root layout with header
│   ├── page.tsx            # Homepage with hero section
│   └── services/
│       └── page.tsx        # Services page
├── components/
│   └── Header.tsx          # Navigation component with mobile menu
└── backup/
    └── original-site/      # Backup of original HTML files
```

## 🎨 Design Features

### Modern Glassmorphism Design
- CSS variables for consistent theming
- Backdrop blur effects
- Glass-like components with transparency
- Smooth animations and transitions

### Responsive Design
- Mobile-first approach
- Responsive navigation with hamburger menu
- Flexible grid layouts
- Touch-friendly interfaces

### Interactive Components
- Quote request modal
- Mobile navigation slideout
- Hover effects and animations
- Smooth scrolling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd silberarrows.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📱 Features

### Homepage (`/`)
- Hero section with call-to-action
- Services overview cards
- Quote request modal
- Contact information

### Services Page (`/services`)
- Detailed service listings
- Interactive service cards
- Contact call-to-action section

### Global Features
- Sticky navigation header
- Mobile-responsive design
- WhatsApp and phone integration
- Font Awesome icons
- Google Fonts integration

## 🎯 Benefits of Next.js Conversion

### Performance
- **Faster loading** with code splitting
- **Image optimization** with next/image
- **Font optimization** with next/font
- **Static generation** for better SEO

### Development Experience
- **TypeScript** for better development experience
- **Hot reloading** for instant updates
- **Component-based** architecture
- **Modern React hooks** for state management

### SEO & Accessibility
- **Server-side rendering** capability
- **Automatic SEO optimization**
- **Better accessibility** with semantic HTML
- **Meta tags management**

### Maintainability
- **Modular components** for easier updates
- **Consistent styling** with CSS variables
- **Type safety** with TypeScript
- **Modern development tools**

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
npm run export
# Upload out folder to GitHub Pages
```

## 🔧 Customization

### Styling
- Edit `src/app/globals.css` for global styles
- Modify CSS variables in `:root` for theme changes
- Update component styles in respective files

### Content
- Edit `src/app/page.tsx` for homepage content
- Update `src/app/services/page.tsx` for services
- Modify `src/components/Header.tsx` for navigation

### Configuration
- Update `src/app/layout.tsx` for metadata
- Modify `next.config.js` for Next.js settings
- Edit `package.json` for dependencies

## 📞 Contact Information

- **Phone**: +971 4 380 5515
- **WhatsApp**: +971 4 380 5515
- **Address**: Al Manara St, Al Quoz, Dubai

## 📝 License

This project contains the website code for Silber Arrows, a Mercedes-Benz service center in Dubai.

---

**Previous Version**: The original static HTML version is backed up in the `backup/original-site/` directory for reference.
