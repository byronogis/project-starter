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
      // 针对需要固定保留部分区域色彩的情况, 叠加一个仅包含色彩区域的背景图, 配合底层的背景色,
      // 使得仅 currentColor 的部分会自动变色, 而非 currentColor 的部分则固定保持不变
      processor(css, { mode, collection, name }) {
        if (mode === 'mask' && collection === 'custom' && name.includes('reserved')) {
          delete css['background-color']
          const reservedSvg = (css['--un-icon'] as string).replaceAll('currentColor', 'transparent')

          css.background = `${reservedSvg} no-repeat, currentColor`
          css['background-size'] = '100% 100%'
        }
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
