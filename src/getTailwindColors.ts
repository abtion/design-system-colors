import { addContrastColors } from "../index.js"
import { JSONColors } from "./types.js"
import type { Config } from 'tailwindcss'

type TailwindColors = NonNullable<NonNullable<Config['theme']>['colors']>

export default function getTailwindColors(jsonColors: JSONColors, contrastColors = true) {
  if (contrastColors) jsonColors = addContrastColors(jsonColors)
  const tailwindColors: TailwindColors = {}

  for (const [colorName, color] of Object.entries(jsonColors)) {
    let tailwindColor: typeof jsonColors[string]

    if (typeof color === 'string') {
      tailwindColor = `rgb(var(--color-${colorName}) / <alpha-value>)`
      continue
    }

    const shades = color
    tailwindColor = {}
    for (const [shade] of Object.entries(shades)) {
      let variableName = `--color-${colorName}`
      if (shade !== 'DEFAULT') variableName += `-${shade}`

      tailwindColor[shade] = `rgb(var(${variableName}) / <alpha-value>)`
    }

    tailwindColors[colorName] = tailwindColor
  }

  return tailwindColors
}
