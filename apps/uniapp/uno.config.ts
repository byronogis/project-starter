import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { base } from '@project-starter/unocss-config'
import { presetUni } from '@uni-helper/unocss-preset-uni'

export default base(
  {
    wind3: false,
    webFonts: false,
    icons: {
      // scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '1.2em',
        'height': '1.2em',
      },
      collections: {
        custom: FileSystemIconLoader(
          `${resolve(cwd(), 'src/assets/icons/custom')}`,
          (svg) => {
            // return svg.replace(/#fff/, 'currentColor')
            return svg
          },
        ),
        // HBuilderX 必须针对要使用的 Collections 做异步导入
        // carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    },
  },
  {
    presets: [
      presetUni({
        attributify: false,
      }),
    ],
    outputToCssLayers: {
      cssLayerName: () => null,
    },
  } as any,
)
