import { JSONColors } from './types.js'
import { addContrastColors, getColorVariables } from '../index.js'

// Prepare colors for usage in tailwind config and as css variables
export default function getColorStyles(jsonColors: JSONColors, contrastColors = true) {
  if (contrastColors) jsonColors = addContrastColors(jsonColors)

  const colorVariables = getColorVariables(jsonColors)

  const cssVariableStrings = Object.entries(colorVariables).map(
    ([name, value]) => `${name}: ${value};`
  )

  return `
:root {
  ${cssVariableStrings.join('\n  ')}
}
`
}
