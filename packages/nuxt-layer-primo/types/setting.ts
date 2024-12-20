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
  extraActionList?: MaybeRefOrGetter<PrimoExtraActionItem[] | undefined>
}

export type PrimoSidebarMenuItem = MenuItem & {
  // ...
}

export interface PrimoConfig {
  preset: PrimoThemePresetName
  primary: PrimoPrimaryColorName
  surface: PrimoSurfaceName | null
}

export interface PrimoState {
  menuDesktopInactive: boolean
  menuMobileActive: boolean
  activeMenuItem: string | null
}
