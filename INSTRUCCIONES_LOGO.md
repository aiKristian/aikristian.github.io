# Cómo Agregar el Logo de la Empresa

## Opción 1: Logo en el Sidebar (Recomendado)

1. **Prepara tu logo:**
   - Formato: PNG o SVG (recomendado SVG para mejor calidad)
   - Tamaño recomendado: 200x200px o proporcional
   - Nombre del archivo: `logo.png` o `logo.svg`

2. **Coloca el archivo:**
   - Guarda el logo en la raíz del proyecto (misma carpeta que `index.html`)

3. **Agrega el logo en el HTML:**
   - Abre `index.html`
   - Busca la línea 29-32 (dentro del `<aside class="sidebar">`)
   - Reemplaza o agrega después del `<h1>`:

```html
<div> <!-- Top part -->
    <img src="logo.png" alt="Logo" class="logo-img" />
    <h1 class="text-2xl font-bold">CRISTIAN GÓMEZ CARRASCO</h1>
    <p class="text-sm">Scrum Master · Project & Product Manager TI · Desarrollador Full Stack</p>
</div>
```

4. **Agrega estilos CSS (opcional):**
   - Abre `style.css`
   - Agrega al final del archivo:

```css
.logo-img {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-md);
  object-fit: contain;
  background: var(--bg-tertiary);
  padding: var(--spacing-sm);
}
```

## Opción 2: Logo como Favicon

1. **Prepara tu logo:**
   - Formato: PNG
   - Tamaño: 32x32px o 64x64px
   - Nombre: `favicon.png`

2. **Coloca el archivo:**
   - Guarda en la raíz del proyecto

3. **El favicon ya está configurado:**
   - El HTML ya tiene la referencia a `favicon.png`
   - Solo necesitas colocar el archivo con ese nombre

## Opción 3: Logo en el Hero Section

Si prefieres mostrar el logo en la sección principal (hero):

1. **Prepara tu logo** (mismo proceso que Opción 1)

2. **Agrega en el HTML:**
   - Busca la sección `<section id="profile">` (alrededor de línea 85)
   - Agrega antes del `<h1>`:

```html
<section id="profile" class="mb-12 fade-in delay-1" data-view="complete technical management">
  <div class="hero-section py-10">
    <img src="logo.png" alt="Logo" class="hero-logo" />
    <h1 class="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">Hola, soy Cristian 👋</h1>
    <!-- resto del contenido -->
  </div>
</section>
```

3. **Agrega estilos CSS:**

```css
.hero-logo {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-lg);
  object-fit: contain;
  box-shadow: var(--shadow-md);
}
```

## Recomendaciones

- **Formato SVG**: Mejor calidad y se adapta a cualquier tamaño
- **Fondo transparente**: Si usas PNG, usa fondo transparente
- **Tamaño del archivo**: Mantén el logo optimizado (< 100KB)
- **Colores**: Considera tener versiones para tema claro y oscuro si es necesario

## ¿Necesitas ayuda?

Si tienes el logo pero no sabes cómo optimizarlo o convertirlo, puedo ayudarte. Solo compárteme el logo y te indico cómo agregarlo.

