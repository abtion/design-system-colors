import colorString from 'color-string'
import { ColorTheme } from './types.js'

function rgb(color: string) {
  return colorString.get.rgb(color)?.slice(0, 3).join(' ')
}

/**
 * Generates a map for CSS variables from a color theme
 *
 * @param {ColorTheme} colorTheme A tailwind style color theme
 * @returns {Record<string, string>} A `[CSS variable name]: [color]` map
 */
export default function getColorVariables(jsonColors: ColorTheme): Record<string, string> {
  const cssVariables: Record<string, string> = {}

  for (const [colorName, color] of Object.entries(jsonColors)) {
    if (typeof color === 'string') {
      cssVariables[`--color-${colorName}`] = rgb(color)
      continue
    }

    const shades = color
    for (const [shade, colorCode] of Object.entries(shades)) {
      let variableName = `--color-${colorName}`
      if (shade !== 'DEFAULT') variableName += `-${shade}`
      cssVariables[variableName] = rgb(colorCode)
    }
  }

  return cssVariables
}
