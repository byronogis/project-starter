import { base } from '@project-starter/unocss-config'
import { mergeConfigs } from 'unocss'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([
  config,
  base(
    {
      icons: false,
    },
    {
      outputToCssLayers: {
        cssLayerName: layer => layer.startsWith('nuxt-layer-') ? layer : `uno-${layer}`,
      },
    },
  ) as any,
])
