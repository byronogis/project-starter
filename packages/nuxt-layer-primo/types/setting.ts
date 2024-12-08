import type {
  MenuItem,
} from 'primevue/menuitem'
import type { MaybeRefOrGetter } from 'vue'

export interface PrimoOptions {
  /**
   * 左侧菜单列表
   */
  sidebarMenuList?: MaybeRefOrGetter<PrimoSidebarMenuItem[] | undefined>
  /**
   * 标题
   */
  title?: MaybeRefOrGetter<string | undefined>
  /**
   * 顶部额外操作按钮
   */
  topbarExtraActionList?: MaybeRefOrGetter<PrimoTopbarExtraActionItem[] | undefined>
}

export type PrimoSidebarMenuItem = MenuItem & {
  // ...
}

export interface PrimoConfig {
  preset: PrimoThemePresetName
  primary: PrimoPrimaryColorName
  surface: PrimoSurfaceName | null
  menuMode: PrimoSidebarMenuMode
}

export interface PrimoState {
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
  activeMenuItem: string | null
}
