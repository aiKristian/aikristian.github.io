# Design System Specification: The Strategic Architect

## 1. Overview & Creative North Star
**Creative North Star: The Intelligent Layer**
This design system moves beyond the "portfolio template" to create a high-end digital environment that mirrors the dual nature of a Product Manager and Full Stack Developer. It balances the precision of code with the strategic depth of product leadership.

The aesthetic rejects "flat" design in favor of **Tonal Depth and Editorial Intent**. We break the traditional grid by utilizing intentional asymmetry, where large typographic displays anchor the layout, and content "floats" within a multi-layered glass ecosystem. This system is designed to feel like an advanced AI interface: sophisticated, responsive, and deeply curated.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep slates and electric accents, using Material Design tonal logic to establish hierarchy.

### Core Palette
- **Background (`surface`):** `#0b1326` (The void; deep, infinite slate).
- **Primary Accent (`primary`):** `#c0c1ff` (Indigo-wash for strategic leadership).
- **AI/Secondary Accent (`secondary`):** `#45dfa4` (Emerald-mist for technical execution and AI focus).
- **Text (`on-surface`):** `#dae2fd` (A soft, high-contrast gray that reduces eye strain).

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning or containment. Boundaries must be defined through:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
2.  **Tonal Transitions:** Using subtle gradients to suggest the end of one content block and the start of another.
3.  **Negative Space:** Leveraging the spacing scale to create "invisible" barriers.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of frosted glass.
*   **Base Level:** `surface` (#0b1326).
*   **Nesting Level 1:** `surface-container-low` (#131b2e) for secondary content sections.
*   **Nesting Level 2 (The Card):** `surface-container` (#171f33) for primary interactive elements.
*   **Nesting Level 3 (The Popover):** `surface-container-highest` (#2d3449) for modals or tooltips.

### The "Glass & Gradient" Rule
To signify "AI Intelligence," use Glassmorphism for floating elements. 
*   **The Glass Formula:** `surface-variant` at 40% opacity + 20px Backdrop Blur.
*   **Signature Texture:** Main CTAs should utilize a linear gradient from `primary` (#c0c1ff) to `primary-container` (#8083ff) at a 135-degree angle to provide a "glow" that flat colors lack.

---

## 3. Typography
We use a high-contrast scale to create an editorial feel, pairing the technical precision of **Inter** with the modern character of **Plus Jakarta Sans**.

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | Bold, strategic statements. |
| **Headline** | `headline-lg` | Plus Jakarta Sans | 2rem | Project titles and section starts. |
| **Title** | `title-lg` | Inter | 1.375rem | Sub-headers and card titles. |
| **Body** | `body-lg` | Inter | 1rem | Long-form reading and strategy docs. |
| **Label** | `label-md` | Inter | 0.75rem | Metadata, tags, and small captions. |

**Hierarchy Logic:** Use `display-lg` sparingly to anchor a page. Pair it with `label-md` in all-caps (tracking +10%) for a technical, "data-rich" aesthetic.

---

## 4. Elevation & Depth
In this system, elevation is a product of light and opacity, not just shadows.

*   **The Layering Principle:** To "lift" a card, do not use a shadow first. Instead, place a `surface-container-low` card on a `surface` background. The subtle shift in lightness creates a sophisticated, natural lift.
*   **Ambient Shadows:** Use only for floating elements (e.g., navigation docks). 
    *   *Shadow:* `0px 20px 40px rgba(0, 0, 0, 0.4)`. 
    *   *Ambient Glow:* Add a 2px outer "glow" using `primary` at 5% opacity to simulate light emission.
*   **The Ghost Border Fallback:** If accessibility requires a container definition, use `outline-variant` (#464554) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary` to `primary-container`), roundedness `md` (0.75rem). No border. Text color: `on-primary`.
*   **Secondary/AI:** `outline` variant at 20% opacity with `secondary` (#45dfa4) text.
*   **Tertiary:** Ghost style; `on-surface` text with an underline that appears only on hover.

### Glass Cards
*   **Structure:** No dividers. Separation is achieved through `body-lg` text over `body-sm` metadata.
*   **Visuals:** 1px "Ghost Border" top and left only to simulate a light catch on the edge of the glass.

### Chips (Tech Stack & Skills)
*   **Style:** `surface-container-highest` background, `label-md` text. 
*   **AI Tags:** Use `secondary_container` background with `on-secondary-container` text to highlight specific AI/ML competencies.

### Input Fields
*   **State:** Default background is `surface-container-lowest`. On focus, transition background to `surface-container-high` and add a `primary` 1px bottom-border only. This "editorial" input style feels more bespoke than a four-sided box.

### Project Timeline (Custom Component)
*   Instead of a vertical line, use a series of staggered `surface-container` blocks. Use `secondary` (Emerald) dots to indicate "AI Integration" points along the roadmap.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. A text block on the left balanced by a floating glass card on the right creates a "designed" feel.
*   **Do** use large amounts of white space (use `xl` spacing tokens). 
*   **Do** use `secondary_fixed_dim` for icons related to technical stack or AI to differentiate from product/strategy icons.

### Don't
*   **Don't** use 100% white (#FFFFFF). Always use `gray-100` (`on-surface`) to maintain the premium dark-mode depth.
*   **Don't** use standard "Drop Shadows" (black, high opacity). They muddy the slate background.
*   **Don't** use divider lines between list items. Use vertical padding (1.5rem+) to separate thoughts.
*   **Don't** use harsh corners. Stick to the `md` (0.75rem) or `lg` (1rem) roundedness scale to keep the tech-forward look "friendly" and modern.
