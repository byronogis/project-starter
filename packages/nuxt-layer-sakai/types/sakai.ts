import type {
  PaletteDesignToken,
} from '@primevue/themes/types'
import type {
  MenuItem,
} from 'primevue/menuitem'
import type { MaybeRefOrGetter } from 'vue'

export interface SakaiOptions {
  /**
   * 左侧菜单列表
   */
  sidebarMenuList?: MaybeRefOrGetter<SakaiSidebarMenuItem[] | undefined>
  /**
   * 标题
   */
  title?: MaybeRefOrGetter<string | undefined>
  /**
   * 顶部额外操作按钮
   */
  topbarExtraActionList?: MaybeRefOrGetter<SakaiTopbarExtraActionItem[] | undefined>
}

export type SakaiSidebarMenuItem = MenuItem & {
  // ...
}

export interface SakaiColorItem {
  name: string
  palette: PaletteDesignToken & {
    0?: string
  }
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

export type SakaiThemePresetName =
  | 'Aura'
  | 'Lara'
  | 'Nora'

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

export type SakaiSidebarMenuMode =
  | 'static'
  | 'overlay'
