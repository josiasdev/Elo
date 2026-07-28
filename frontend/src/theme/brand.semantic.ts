import { brandRaw } from '@/theme/brand.raw'

function toCssRgb(rgb: string) {
  return rgb.replaceAll(',', '')
}

// Semantic mappings are interface decisions that compose official guide colors.
// They are not new official brand colors.
export const brandSemantic = {
  colors: {
    background: {
      canvas: brandRaw.colors.baseIvory.hex,
      surface: brandRaw.colors.baseIvory.hex,
      surfaceRaised: `rgb(${toCssRgb(brandRaw.colors.primaryBlue.rgb)} / 0.16)`,
      inverse: brandRaw.colors.contrastNavy.hex,
      accent: brandRaw.colors.primaryBlue.hex,
      support: brandRaw.colors.supportYellow.hex,
    },
    text: {
      primary: brandRaw.colors.contrastNavy.hex,
      inverse: brandRaw.colors.baseIvory.hex,
      muted: brandRaw.colors.contrastPlum.hex,
      accent: brandRaw.colors.contrastPlum.hex,
    },
    border: {
      default: `rgb(${toCssRgb(brandRaw.colors.contrastNavy.rgb)} / 0.18)`,
      strong: brandRaw.colors.contrastNavy.hex,
      accent: brandRaw.colors.primaryBlue.hex,
    },
    action: {
      primary: brandRaw.colors.primaryBlue.hex,
      primaryText: brandRaw.colors.contrastNavy.hex,
      secondary: brandRaw.colors.supportYellow.hex,
      secondaryText: brandRaw.colors.contrastNavy.hex,
      disabled: `rgb(${toCssRgb(brandRaw.colors.contrastNavy.rgb)} / 0.34)`,
    },
    status: {
      noOpportunity: 'transparent',
      scarceOpportunity: brandRaw.colors.supportPink.hex,
      availableOpportunity: brandRaw.colors.primaryBlue.hex,
      outline: brandRaw.colors.contrastNavy.hex,
      text: brandRaw.colors.contrastNavy.hex,
    },
    functional: {
      focusRing: brandRaw.colors.contrastNavy.hex,
      shadow: `rgb(${toCssRgb(brandRaw.colors.contrastNavy.rgb)} / 0.12)`,
      overlay: `rgb(${toCssRgb(brandRaw.colors.contrastNavy.rgb)} / 0.72)`,
    },
  },
  typography: {
    family: {
      heading: brandRaw.typography.headingFamily.join(', '),
      body: brandRaw.typography.bodyFamily.join(', '),
    },
  },
} as const
