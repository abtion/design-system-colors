# Design System Colors

Utilities to standardize colors across differently themed projects - making it possible to share components through [Abtion's component library](https://muffibook.abtion.com)

## Usage

The idea is that:

1. A designer creates a style guide for a project, with contextual colors (neutral, primary, secondary, success, danger, warning, info)

2. The designer creates color shades for each contextual color 100-900, and dark/light colors, which will be used to provide contrast for light/dark shades respectively.

3. A `colors.json`-file with all the colors is created:

    ```json
    {
      "dark": "#111827",
      "light": "#F3F4F6",
      "neutral": {
        "DEFAULT": "#6B7280",
        "100": "#F3F4F6",
        ...
        "900": "#111827"
      },
      "primary": {
        "DEFAULT": "#2563EB",
        "100": "#D3E6FE",
        ...
        "900": "#071A70"
      },

      ...
    }
    ```

4. `getColorStyles` is used to generate a stylesheet with all colors specified as CSS variables (`R G B`), and each shade with a contrast colors added ("dark" or "light" based on relative luminance):

    ```css
    :root {
      --color-dark: 17 24 39;
      --color-light: 243 244 246;

      --color-neutral: 107 114 128;
      --color-neutral-contrast: 243 244 246;

      --color-neutral-100: 243 244 246;
      --color-neutral-100-contrast: 17 24 39;
      ...
      --color-neutral-900: 17 24 39;
      --color-neutral-900-contrast: 243 244 246;

      --color-primary: 37 99 235;
      --color-primary-contrast: 243 244 246;

      --color-primary-100: 211 230 254;
      --color-primary-100-contrast: 17 24 39;
      ...
      --color-primary-900: 7 26 112;
      --color-primary-900-contrast: 243 244 246;

      ...
    }
    ```

5. `getTailwindColors` is used to provide the colors to the tailwind configuration (with contrast colors and support for opacity):

    ```js
    {
      dark: 'rgb(var(--color-dark) / <alpha-value>)',
      light: 'rgb(var(--color-light) / <alpha-value>)',
      neutral: {
        DEFAULT: 'rgb(var(--color-neutral) / <alpha-value>)',
        contrast: 'rgb(var(--color-neutral-contrast) / <alpha-value>)',

        '100': 'rgb(var(--color-neutral-100) / <alpha-value>)',
        '100-contrast': 'rgb(var(--color-neutral-100-contrast) / <alpha-value>)',
        ...
        '900': 'rgb(var(--color-neutral-900) / <alpha-value>)',
        '900-contrast': 'rgb(var(--color-neutral-900-contrast) / <alpha-value>)',
      },
      primary: {
        DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
        contrast: 'rgb(var(--color-info-contrast) / <alpha-value>)'

        '100-contrast': 'rgb(var(--color-danger-100-contrast) / <alpha-value>)',
        ...
        '900': 'rgb(var(--color-primary-900) / <alpha-value>)',
        '900-contrast': 'rgb(var(--color-info-900-contrast) / <alpha-value>)',
      },
      ...
    }
    ```

6. Now the project can be styles using the contextual colors (and contrast colors), and shared components from [the component library](https://muffibook.abtion.com) can be dropped in and used with few adjustments needed.


## Utilities

Usually a project would only need to use:
- [getColorStyles](./src/getColorStyles.ts)
- [getTailwindColors](./src/getTailwindColors.ts)

Other utilities are:
- [addContrastColors](./src/addContrastColors.ts)
- [getContrastColor](./src/getContrastColor.ts)
- [getColorVariables](./src/getColorVariables.ts)
- [getLuminance](./src/getLuminance.ts)
