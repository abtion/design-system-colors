import getContrastColor from './getContrastColor.js'
import { ColorTheme } from './types.js'

/**
 * Create a copy of a tailwind style color theme with a contrast color added to each color shade.
 * The "light" and "dark" colors from the theme will be tested against each shade and the color with
 * most contrast (see {@link getContrastColor}) will be picked.
 *
 * @param {ColorTheme} colorTheme A tailwind style color theme
 * @returns {ColorTheme} A copy of the input color theme, with contrast colors added
 */
export default function addContrastColors(colorTheme: ColorTheme): ColorTheme {
  const { light, dark } = colorTheme
  const result = {} as ColorTheme

  for (const [colorName, color] of Object.entries(colorTheme)) {
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
