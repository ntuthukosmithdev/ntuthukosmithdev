# Ntuthuko Smith — Portfolio (2026 Edition)

Editorial dark-mode, single-page portfolio for a full-stack software developer
based in South Africa. Successor to the original
[ntuthukosmith.github.io](https://ntuthukosmith.github.io) site.
Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**,
**Lenis** smooth scroll, and **lucide-react** icons.

## Stack

- Next.js 14 / React 18 / TypeScript
- Tailwind CSS (custom Editorial palette)
- Framer Motion (reveals, parallax, transitions)
- Lenis (`lenis`) — high-end smooth scroll
- lucide-react — icon set
- Google Fonts: Instrument Serif + Inter + JetBrains Mono

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
app/
  layout.tsx        # Fonts, SmoothScroll wrapper, MagneticCursor
  page.tsx          # Single-page composition (Hero, Work, About, Stack, Footer)
  globals.css       # Tailwind + grain + cursor styles
components/
  SmoothScroll.tsx  # Lenis provider with anchor-link interception
  MagneticCursor.tsx# Custom blended pointer with hover labels (data-cursor)
  Reveal.tsx        # <RevealText/> staggered words + <Reveal/> generic fade
  MagneticButton.tsx# Magnetic CTA wrapper
```

## Customization

- **Projects**: edit `PROJECTS` in `app/page.tsx`.
- **Stack tiles**: edit `STACK` in `app/page.tsx`.
- **Email / phone**: change `email` in `Footer` and the `tel:` link nearby.
- **Cursor labels**: add `data-cursor="Label"` to any element.

## Owner

- **Name**: Ntuthuko Smith
- **Location**: South Africa
- **Email**: ntuthukosmith10@gmail.com
- **Phone**: +27 67 711 5581
- **Stack focus**: JavaScript / TypeScript, Python, React, Next.js, Node.js, Django

## Notes

- Custom cursor is automatically disabled on touch devices.
- All images load from Unsplash CDN — swap for your own in `next.config.mjs` allowlist.
- Designed mobile-first; the Bento grid collapses gracefully on narrow viewports.
