import { addContrastColors } from "../index.js"
import { ColorTheme } from "./types.js"
import type { Config } from 'tailwindcss'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type getColorVariables from './getColorVariables.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type getColorStyles from './getColorStyles.js'

type TailwindColors = NonNullable<NonNullable<Config['theme']>['colors']>

/**
 * Generates tailwind color theme where:
 * - Each color references a CSS variables (generated with {@link getColorVariables})
 * - Each color supports opacity modifiers
 * - Optional contrast colors added
 *
 * As the theme uses the CSS variables generated from {@link getColorVariables} those variables will
 * have to be added to the page's styling for the theme to work.
 *
 * Use {@link getColorStyles} to generate a stylesheet with the used CSS variables.
 * Remember to use the same option for `contrastColors`.
 *
 * @param {ColorTheme} colorTheme A tailwind style color theme
 * @param {boolean} [contrastColors=true] Generate contrast colors with {@link addContrastColors}
 * @returns {ColorTheme} Generated tailwind color theme
 */
export default function getTailwindColors(colorTheme: ColorTheme, contrastColors = true) {
  if (contrastColors) colorTheme = addContrastColors(colorTheme)
  const tailwindColors: TailwindColors = {}

  for (const [colorName, color] of Object.entries(colorTheme)) {
    if (typeof color === 'string') {
      tailwindColors[colorName] = `rgb(var(--color-${colorName}) / <alpha-value>)`
      continue
    }

    const shades = color
    const tailwindColor: typeof colorTheme[string] = {}
    for (const [shade] of Object.entries(shades)) {
      let variableName = `--color-${colorName}`
      if (shade !== 'DEFAULT') variableName += `-${shade}`

      tailwindColor[shade] = `rgb(var(${variableName}) / <alpha-value>)`
    }
    tailwindColors[colorName] = tailwindColor
  }

  return tailwindColors
}
