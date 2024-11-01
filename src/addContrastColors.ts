import getContrastColor from './getContrastColor.js'
import { JSONColors } from './types.js'

// Prepare colors for usage in tailwind config and as css variables
export default function prepareColorVariables(jsonColors: JSONColors) {
  const { light, dark } = jsonColors
  const result = {} as JSONColors

  for (const [colorName, color] of Object.entries(jsonColors)) {
    if (typeof color === 'string') {
      // Only copy colors without shades
      result[colorName] = color
      continue
    }
    const shades = color

    result[colorName] = {}
    for (const [shade, colorCode] of Object.entries(shades)) {
      result[colorName][shade] = colorCode

      const shadeIsContrastColor = /^(.+-|)contrast$/.test(shade)
      if (shadeIsContrastColor) continue

      const contrastVariantName = shade === 'DEFAULT' ? 'contrast' : `${shade}-contrast`

      // If a color has a manually specified contrast color, don't compute one
      if (shades[contrastVariantName] !== undefined) continue

      const contrastColor = getContrastColor(colorCode, dark, light)

      if (shade === 'DEFAULT') {
        result[colorName]['contrast'] = contrastColor
      } else {
        result[colorName][`${shade}-contrast`] = contrastColor
      }
    }
  }

  return result
}
