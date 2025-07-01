# Polymet AI Studio Landing Page

## Project Overview
A modern, minimalist landing page for Polymet AI Studio venture studio, built with React 19 + TypeScript + Vite.

## Architecture & Technology Stack

### Core Technologies
- **React 19.0.0** - Latest React with new features (Actions, use API, improved Suspense)
- **TypeScript 5.7.2** - For type safety
- **Vite 6.2.0** - Modern build tool for fast development
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM** - For client-side routing
- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Pre-styled components built on Radix UI

### Project Structure
```
polymet-ai-studio/
├── src/
│   ├── polymet/           # Domain-specific components
│   │   ├── components/    # Landing page components
│   │   ├── layouts/       # Layout wrappers
│   │   └── pages/         # Page components
│   ├── components/ui/     # Reusable UI components (shadcn)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main app router
│   └── main.tsx           # Entry point
```

## Design Patterns & Conventions

### Component Architecture
- **Feature-based organization** - Components grouped by feature (polymet folder)
- **Atomic design** - UI components are small, reusable atoms
- **Composition pattern** - Complex components built from simpler ones

### Styling System
- **Tailwind CSS** for utility classes
- **CSS Variables** for theming (dark/light mode support)
- **cn() utility** for className merging (clsx + tailwind-merge)
- **Minimalist design** - Black background, white text, subtle grays

### State Management
- **Local state** with useState hooks
- No global state management currently
- **Props drilling** for data flow

### Code Conventions
- **TypeScript interfaces** for component props
- **Functional components** only
- **Named exports** for components
- **Absolute imports** using @ alias

## Current Implementation

### Key Components
1. **LandingLayout** - Main layout wrapper with header
2. **LandingPage** - Main content with hero text and CTA
3. **FloatingDock** - Bottom navigation with icon links
4. **HeroText** - Typography component for hero messaging
5. **CTAButton** - Call-to-action button wrapper
6. **SVGLogo** - Custom SVG logo component

### Features
- Responsive design (mobile/desktop variants)
- Animated floating dock navigation
- Minimalist venture studio branding
- "$1M Uncapped, 5% Equity" positioning

## Areas for Improvement

### Performance
- **Bundle size** - Many unused dependencies (300+ packages)
- Remove unused packages like d3, echarts, ag-grid, etc.
- Consider code splitting for route-based chunks

### Accessibility
- Add ARIA labels to navigation items
- Ensure proper heading hierarchy
- Add keyboard navigation support to FloatingDock
- Include skip navigation link

### SEO & Meta
- Implement React 19's new metadata features
- Add Open Graph tags
- Include structured data
- Add sitemap generation

### UI/UX Enhancements
- Add smooth scroll animations
- Implement page transitions
- Add hover states to all interactive elements
- Consider adding a loading state

### Architecture
- Implement proper error boundaries
- Add 404 page handling
- Consider Server Components when stable
- Add analytics integration

### Testing
- No tests currently exist
- Add unit tests for components
- Add integration tests for navigation
- Add accessibility tests

## Future Considerations
1. **Content Management** - Consider headless CMS for dynamic content
2. **Internationalization** - Multi-language support
3. **Animation Library** - Framer Motion is installed but unused
4. **Form Handling** - For application submissions
5. **API Integration** - For dynamic data fetching

## Style Guidelines
- **Minimalism first** - Less is more
- **Monochromatic palette** - Black, white, grays
- **Typography focus** - Let content speak
- **Subtle interactions** - Smooth, not flashy
- **Mobile-first** - Design for small screens first 