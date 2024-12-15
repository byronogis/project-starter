import { $t, updatePreset, updateSurfacePalette } from '@primevue/themes'

export function usePrimoStore(options?: PrimoOptions) {
  const {
    title = 'Primo',
    sidebarMenuList = [
      {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'i-prime:home', to: '/' }],
      },
    ],
    extraActionList = [],
  } = options ?? {}

  const breakpoints = useBreakpoints({
    'sm': 576,
    'md': 768,
    'lg': 992,
    'xl': 1200,
    '2xl': 1920,
  })

  const isMobile = breakpoints.smaller('lg')

  /**
   * 配置
   */
  const config = useCookie<PrimoConfig>('primo-config', {
    default: () => PrimoConfigDefaultCST,
  })

  /**
   * 状态
   */
  const state = useLocalStorage<PrimoState>('primo-state', {
    menuMobileActive: false,
    menuDesktopInactive: false,

    profileSidebarVisible: false,
    configSidebarVisible: false,

    menuHoverActive: false,

    activeMenuItem: null,
  })

  /**
   * preset 变化时
   */
  watchImmediate(() => config.value.preset, (_preset) => {
    const presetValue = PrimoThemePresetsCST[_preset]
    const surfacePalette = PrimoSurfaceListCST.find(s => s.name === config.value.surface)?.palette
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
    const surface = PrimoSurfaceListCST.find(s => s.name === config.value.surface)
    surface && updateSurfacePalette(surface.palette)
  })

  /**
   * 根据当前配置生成预设
   */
  function getPresetExt() {
    const color = PrimoPrimaryColorListCST.find(c => c.name === config.value.primary) ?? PrimoPrimaryColorListCST[0]!

    return sakakiThemePresetGenerator(color)
  }

  function onMenuToggle() {
    if (isMobile) {
      state.value.menuMobileActive = !state.value.menuMobileActive
    }
    else {
      state.value.menuDesktopInactive = !state.value.menuDesktopInactive
    }
  };

  function setActiveMenuItem(item: string | null) {
    state.value.activeMenuItem = item
  };

  function resetMenu() {
    state.value.menuDesktopInactive = false
    state.value.menuMobileActive = false
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
    extraActionList,

    config,
    state,

    onMenuToggle,
    setActiveMenuItem,
    resetMenu,
    isMobile,
    styleClass,
  })
}
