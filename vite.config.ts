import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The four latin text faces paint above the fold. Preloading them removes the
 * late font-swap that otherwise becomes the mobile LCP.
 */
function preloadCriticalFonts(): Plugin {
  const wanted = [
    'space-grotesk-latin-wght-normal',
    'instrument-serif-latin-400-normal',
    'instrument-serif-latin-400-italic',
    'inter-latin-wght-normal',
  ]

  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      const fonts = Object.keys(ctx.bundle ?? {}).filter(
        (file) => file.endsWith('.woff2') && wanted.some((name) => file.includes(name)),
      )
      if (fonts.length === 0) return html

      const links = fonts.map(
        (file) =>
          `    <link rel="preload" as="font" type="font/woff2" crossorigin href="/${file}" />`,
      )
      return html.replace('</head>', `${links.join('\n')}\n  </head>`)
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadCriticalFonts()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // No modulepreload tags for the 3D chunk: Vite's preload helper can pull
    // the chunk into the entry graph, making mobile download it up front.
    modulePreload: false,
    // Let Rollup decide chunking. An explicit `three` manual chunk also
    // captures Vite's shared preload helper, which forces the 3D bundle into
    // the initial download even when the hero shows its static fallback.
  },
})
