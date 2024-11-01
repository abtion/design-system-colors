import getLuminance from './getLuminance.js'

/**
 * Based on luminance, pick the best suited contrast color (dark/light) to the target color based on
 * calculated luminance (see {@link getLuminance})
 *
 * @param {string} target A string representing a color
 * @param {string} dark A string representing a dark color
 * @param {string} light A string representing a light color
 * @returns {string} The color dark/light that provides the best contrast
 */
export default function getContrastColor(target: string, dark: string, light: string): string {
  const targetLuminance = getLuminance(target)
  const darkLuminance = getLuminance(dark)
  const lightLuminance = getLuminance(light)

  const darkDiff = Math.abs(targetLuminance - darkLuminance)
  const lightDiff = Math.abs(targetLuminance - lightLuminance)

  return darkDiff > lightDiff ? dark : light
}
