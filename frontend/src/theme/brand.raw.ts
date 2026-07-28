import type { BrandRawTokens } from '@/theme/brand.types'

// Official EloCiv brand tokens from the visual identity guide.
// Do not change these values without updating the source guide.
export const brandRaw = {
  colors: {
    supportYellow: {
      hex: '#F4DC67',
      rgb: '244, 220, 103',
      cmyk: '0%, 10%, 58%, 4%',
      role: 'Cor de suporte',
    },
    supportPink: {
      hex: '#EDA9C2',
      rgb: '237, 169, 194',
      cmyk: '0%, 29%, 18%, 7%',
      role: 'Cor de suporte',
    },
    primaryBlue: {
      hex: '#8DD8F0',
      rgb: '141, 216, 240',
      cmyk: '41%, 10%, 0%, 6%',
      role: 'Cor primária',
    },
    contrastNavy: {
      hex: '#20283A',
      rgb: '32, 40, 58',
      cmyk: '45%, 31%, 0%, 77%',
      role: 'Cor de contraste',
    },
    contrastPlum: {
      hex: '#69475F',
      rgb: '105, 71, 95',
      cmyk: '0%, 32%, 10%, 59%',
      role: 'Cor de contraste',
    },
    baseIvory: {
      hex: '#FFFDF7',
      rgb: '255, 253, 247',
      cmyk: '0%, 1%, 3%, 0%',
      role: 'Cor base',
    },
  },
  typography: {
    headingFamily: ['Sifonn', 'League Spartan', 'sans-serif'],
    bodyFamily: ['Nunito Sans', 'DM Sans', 'sans-serif'],
  },
} as const satisfies BrandRawTokens
