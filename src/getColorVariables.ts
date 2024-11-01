import colorString from 'color-string'
import { JSONColors } from './types.js'

function rgb(color: string) {
  return colorString.get.rgb(color)?.slice(0, 3).join(' ')
}

// Prepare colors for usage in tailwind config and as css variables
export default function colorVariables(jsonColors: JSONColors) {
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
