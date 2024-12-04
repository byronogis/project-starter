import { $t, updatePreset, updateSurfacePalette } from '@primevue/themes'

export function useSakaiStore(options?: SakaiOptions) {
  const {
    title = 'Sakai',
    sidebarMenuList = [
      {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'i-prime:home', to: '/' }],
      },
    ],
    topbarExtraActionList = [],
  } = options ?? {}

  /**
   * 配置
   */
  const config = useCookie<SakaiConfig>('sakai-config', {
    default: () => SakaiConfigDefaultCST,
  })

  /**
   * 状态
   */
  const state = useLocalStorage<SakaiState>('sakai-state', {
    staticMenuMobileActive: false,
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,

    profileSidebarVisible: false,
    configSidebarVisible: false,

    menuHoverActive: false,

    activeMenuItem: null,
  })

  /**
   * preset 变化时
   */
  watchImmediate(() => config.value.preset, (_preset) => {
    const presetValue = SakaiThemePresetsCST[_preset]
    const surfacePalette = SakaiSurfaceListCST.find(s => s.name === config.value.surface)?.palette
    $t()
      .preset(presetValue)
      .preset(getPresetExt())
      .surfacePalette(surfacePalette)
      .use({ useDefaultOptions: true })
  })

  /**
   * primary / surface 变化时
   */
  watchImmediate(() => config.value.primary, () => {
    updatePreset(getPresetExt())
  })
  watchImmediate(() => config.value.surface, () => {
    const surface = SakaiSurfaceListCST.find(s => s.name === config.value.surface)
    surface && updateSurfacePalette(surface.palette)
  })

  /**
   * 根据当前配置生成预设
   */
  function getPresetExt() {
    const color = SakaiPrimaryColorListCST.find(c => c.name === config.value.primary) ?? SakaiPrimaryColorListCST[0]!

    return sakakiThemePresetGenerator(color)
  }

  function onMenuToggle() {
    if (config.value.menuMode === 'overlay') {
      state.value.overlayMenuActive = !state.value.overlayMenuActive
    }

    // 992 is the breakpoint of the layout
    if (window.innerWidth > 991) {
      state.value.staticMenuDesktopInactive = !state.value.staticMenuDesktopInactive
    }
    else {
      state.value.staticMenuMobileActive = !state.value.staticMenuMobileActive
    }
  };

  function setActiveMenuItem(item: string | null) {
    state.value.activeMenuItem = item
  };

  function resetMenu() {
    state.value.overlayMenuActive = false
    state.value.staticMenuMobileActive = false
    state.value.menuHoverActive = false
  };

  const styleClass = {
    actionBtn: {
      selector: '@next',
      enterFromClass: 'hidden',
      enterActiveClass: 'animate-fade-in animate-duration-150',
      leaveToClass: 'hidden',
      leaveActiveClass: 'animate-fade-out animate-duration-150',
      hideOnOutsideClick: true,
    },
  }

  return reactive({
    title,
    sidebarMenuList,
    topbarExtraActionList,

    config,
    state,

    onMenuToggle,
    setActiveMenuItem,
    resetMenu,
    styleClass,
  })
}
