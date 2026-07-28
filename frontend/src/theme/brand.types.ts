export interface BrandColorToken {
  hex: string
  rgb: string
  cmyk: string
  role: string
}

export interface BrandRawTokens {
  colors: {
    supportYellow: BrandColorToken
    supportPink: BrandColorToken
    primaryBlue: BrandColorToken
    contrastNavy: BrandColorToken
    contrastPlum: BrandColorToken
    baseIvory: BrandColorToken
  }
  typography: {
    headingFamily: readonly string[]
    bodyFamily: readonly string[]
  }
}

export type OpportunityAvailability = 'none' | 'scarce' | 'available'
