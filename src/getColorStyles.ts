import { ColorTheme } from './types.js'
import { addContrastColors, getColorVariables } from '../index.js'

/**
 * Generates a style sheet with color variables (generated by {@link getColorVariables}).
 *
 * @param {ColorTheme} colorTheme A tailwind style color theme
 * @param {boolean} [contrastColors=true] Generate contrast colors with {@link addContrastColors}
 * @returns {string} Stylesheet with a :root tag declaring all generated variables
 */
export default function getColorStyles(colorTheme: ColorTheme, contrastColors: boolean = true): string {
  if (contrastColors) colorTheme = addContrastColors(colorTheme)

  const colorVariables = getColorVariables(colorTheme)

  const cssVariableStrings = Object.entries(colorVariables).map(
    ([name, value]) => `${name}: ${value};`
  )

  return `
:root {
  ${cssVariableStrings.join('\n  ')}
}
`
}
