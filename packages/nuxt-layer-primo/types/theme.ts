import type {
  PaletteDesignToken,
} from '@primevue/themes/types'

export interface PrimoColorItem {
  name: string
  palette: PaletteDesignToken & {
    0?: string
  }
}

export interface PrimoPrimaryColorItem extends Omit<PrimoColorItem, 'name'> {
  name: PrimoPrimaryColorName
}

export interface PrimoSurfaceItem extends Omit<PrimoColorItem, 'name'> {
  name: PrimoSurfaceName
}

export type PrimoThemePresetName =
  | 'Aura'
  | 'Lara'
  | 'Nora'
  | 'Material'

export type PrimoPrimaryColorName =
  | 'noir'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

export type PrimoSurfaceName =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'soho'
  | 'viva'
  | 'ocean'
