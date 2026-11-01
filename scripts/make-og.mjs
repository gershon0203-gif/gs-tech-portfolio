/**
 * Generates the Open Graph cover image (1200×630) from an SVG composition.
 * Run after changing the design system: node scripts/make-og.mjs
 */
import sharp from 'sharp'
import path from 'node:path'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F3EEE4"/>
  <rect x="0" y="0" width="1200" height="10" fill="#D8431C"/>
  <g fill="#151412" font-family="Segoe UI, Arial, sans-serif">
    <text x="72" y="132" font-size="22" letter-spacing="10" font-weight="600">GS TECH</text>
    <text x="72" y="196" font-size="20" letter-spacing="4" fill="#6E675D">GERSHON S — CREATIVE DEVELOPER</text>
    <text x="72" y="360" font-size="96" font-weight="700" letter-spacing="-4">AN EXPERIMENT</text>
    <text x="72" y="458" font-size="96" font-weight="700" letter-spacing="-4">IN BUILDING</text>
    <text x="72" y="556" font-size="96" font-weight="700" letter-spacing="-4">DIGITAL EXPERIENCES.</text>
  </g>
  <circle cx="1090" cy="204" r="46" fill="#D8431C"/>
  <g stroke="#151412" stroke-opacity="0.22" stroke-width="1">
    <line x1="72" y1="592" x2="1128" y2="592"/>
    <line x1="840" y1="80" x2="840" y2="592"/>
  </g>
  <text x="72" y="614" font-family="Segoe UI, Arial, sans-serif" font-size="16" letter-spacing="3" fill="#6E675D">FROM AN IDEA TO AN INTERFACE. FROM AN INTERFACE TO A PRODUCT.</text>
</svg>`

await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(path.join('public', 'og-cover.jpg'))
console.log('public/og-cover.jpg written')
