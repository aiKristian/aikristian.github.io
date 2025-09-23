# Changelog

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
