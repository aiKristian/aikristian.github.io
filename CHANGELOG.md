# Changelog

## [2.0.0] - 2025-01-XX

### Added
- **Sistema de Vistas Múltiples**: Implementado selector de vistas (Completa, Técnica, Gestión) que filtra y reorganiza el contenido según el perfil seleccionado
- **Rediseño Visual Completo**: Nuevo diseño moderno y profesional con mejor tipografía, espaciado y animaciones
- **Sección de Certificaciones Rediseñada**: Diseño tipo tarjetas organizadas por categorías (Scrum/Ágil, Cloud, Desarrollo, Liderazgo, Negocios)
- **Enlaces a Certificaciones PDF**: Todos los certificados ahora tienen enlaces directos a sus PDFs
- **Meta Tags SEO**: Agregados meta tags para descripción, keywords, Open Graph y Twitter Cards
- **Favicon Support**: Preparado para agregar favicon personalizado
- **Mejoras de Accesibilidad**: Mejorados los aria-labels y estructura semántica
- **Iconos en Habilidades**: Agregados iconos Font Awesome a cada habilidad para mejor visualización
- **Animaciones Mejoradas**: Transiciones suaves al cambiar de vistas y mejor feedback visual

### Changed
- **CSS Completamente Rediseñado**: Nuevo sistema de variables CSS, mejor jerarquía visual y diseño más limpio
- **Estructura de Certificaciones**: Reorganizada por categorías con diseño tipo grid de tarjetas
- **Enlaces de Proyectos**: Actualizados para usar clases CSS personalizadas que respetan los temas
- **Filtrado Inteligente**: El contenido se filtra y reordena automáticamente según la vista seleccionada
- **Sidebar Mejorado**: Mejor organización visual con selector de vistas prominente

### Fixed
- **Código Duplicado**: Eliminado código JavaScript duplicado en script.js
- **Filtrado de Contenido**: Corregido el filtrado de habilidades y certificaciones según la vista activa
- **Responsive Design**: Mejorado el diseño responsive para móviles y tablets

### Technical
- **Carpeta de Certificaciones**: Creada carpeta `certificaciones/` para organizar todos los PDFs
- **LocalStorage**: Preferencias de vista y tema se guardan en localStorage
- **Performance**: Optimizadas las animaciones y transiciones

## [1.0.0] - 2025-09-23

### Added
- **New Professional Color Palette**: A new default color palette (`Profesional`) has been introduced with a more corporate and formal look, using shades of blue and gray.
- **Light Theme**: Added styles for a light theme, which is now the default, to improve readability and provide a more traditional CV look.
- **Responsive Padding**: The main content padding is now responsive to provide a better viewing experience on different screen sizes.

### Changed
- **Default Theme**: The default theme has been changed from `dark` to `light`.
- **Color Palettes**:
    - The original "Azul/Verde" palette has been renamed to `Developer` and is available as a secondary option.
    - The "Tierra" and "Pastel" palettes have been removed as they did not align with the professional image of the CV.
- **UI Elements**:
    - Updated the palette selector icons and tooltips to reflect the new options.
    - The theme toggle button now correctly displays a sun icon for the light theme and a moon icon for the dark theme.
- **Styling**:
    - Adjusted the styles for skill tags and project cards to be consistent with the new color palettes in both light and dark modes.
    - Removed hardcoded styles from `index.html` in favor of the more consistent CSS variables.
- **JavaScript**: The `script.js` file was updated to handle the new palette options and theme toggle logic.

### Fixed
- **Layout Issues**: Corrected the excessive padding on the main content area for smaller screens.
- **Visual Inconsistencies**: Ensured that all components now follow the defined color scheme, eliminating visual dissonances.
