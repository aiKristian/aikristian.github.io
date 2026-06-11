---
name: portfolio
description: >-
  Mantiene el portafolio GitHub Pages de Cristian Gómez (HTML, Tailwind, CV).
  Usar al editar HTML/CSS, scripts de build o assets del sitio estático.
---

# Portafolio aikristian.github.io

## Build
```bash
npm run build        # CSS + fonts
npm run lint         # HTML + CSS
npm test             # lint + build
```

## Estructura
- HTML en raíz (`index.html`, `cv.html`, etc.)
- Tailwind input: `src/input.css`, `src/cv-input.css`
- Output: `portfolio.css`, `cv.css`

## Checklist
1. Ejecutar `npm run lint && npm run build` antes de commit
2. Verificar rutas relativas (GitHub Pages)
3. Optimizar imágenes si se agregan assets pesados
