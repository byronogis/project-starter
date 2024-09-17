import type { MaybeRefOrGetter } from 'vue'

export interface SakaiOptions {
  /**
   * 左侧菜单列表
   */
  sidebarMunuList?: MaybeRefOrGetter<SakaiSidebarMenuItem[]>
  /**
   * 标题
   */
  title?: MaybeRefOrGetter<string>
}

export interface SakaiBaseMenuItem {
  label?: string
  icon?: string
  /**
   * router path
   */
  to?: string
  /**
   * external url
   */
  url?: string
  /**
   * target for external url
   */
  target?: string
  /**
   * separator
   * @default false
   */
  separator?: boolean
  /**
   * disabled item
   * @default false
   */
  disabled?: boolean
  /**
   * hidden item
   * @default false
   */
  hidden?: boolean
  /**
   * class
   */
  class?: string
}

export interface SakaiSidebarMenuItem extends SakaiBaseMenuItem {
  /**
   * children
   */
  items?: SakaiSidebarMenuItem[]
  command?: (arg: {
    originalEvent: any
    item: SakaiSidebarMenuItem
  }) => void
}

export interface SakaiColorItem {
  name: string
  palette: Record<string, string>
}

export interface SakaiPrimaryColorItem extends Omit<SakaiColorItem, 'name'> {
  name: SakaiPrimaryColorName
}

export interface SakaiSurfaceItem extends Omit<SakaiColorItem, 'name'> {
  name: SakaiSurfaceName
}

export interface SakaiConfig {
  preset: SakaiThemePresetName
  primary: SakaiPrimaryColorName
  surface: SakaiSurfaceName | null
  menuMode: SakaiSidebarMenuMode
}

export interface SakaiState {
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
  activeMenuItem: string | null
}

export type SakaiThemePresetName = 'Aura' | 'Lara'

export type SakaiPrimaryColorName =
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

export type SakaiSurfaceName =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'soho'
  | 'viva'
  | 'ocean'

export type SakaiSidebarMenuMode = 'static' | 'overlay'
