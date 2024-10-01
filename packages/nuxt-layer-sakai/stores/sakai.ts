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

    if (color.name === 'noir') {
      return {
        semantic: {
          primary: {
            50: '{surface.50}',
            100: '{surface.100}',
            200: '{surface.200}',
            300: '{surface.300}',
            400: '{surface.400}',
            500: '{surface.500}',
            600: '{surface.600}',
            700: '{surface.700}',
            800: '{surface.800}',
            900: '{surface.900}',
            950: '{surface.950}',
          },
          colorScheme: {
            light: {
              primary: {
                color: '{primary.950}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.800}',
                activeColor: '{primary.700}',
              },
              highlight: {
                background: '{primary.950}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff',
              },
            },
            dark: {
              primary: {
                color: '{primary.50}',
                contrastColor: '{primary.950}',
                hoverColor: '{primary.200}',
                activeColor: '{primary.300}',
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.300}',
                color: '{primary.950}',
                focusColor: '{primary.950}',
              },
            },
          },
        },
      }
    }
    else {
      return {
        semantic: {
          primary: color.palette,
          colorScheme: {
            light: {
              primary: {
                color: '{primary.500}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.600}',
                activeColor: '{primary.700}',
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.100}',
                color: '{primary.700}',
                focusColor: '{primary.800}',
              },
            },
            dark: {
              primary: {
                color: '{primary.400}',
                contrastColor: '{surface.900}',
                hoverColor: '{primary.300}',
                activeColor: '{primary.200}',
              },
              highlight: {
                background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                color: 'rgba(255,255,255,.87)',
                focusColor: 'rgba(255,255,255,.87)',
              },
            },
          },
        },
      }
    }
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

export const SakaiStoreInjectionKey = Symbol('SakaiStoreInjectionKey') as InjectionKey<
  ReturnType<typeof useSakaiStore>
>
