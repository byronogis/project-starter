export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    const str = `<script type="text/javascript">
      // This script is a preflight to sync the local primary and surface color of PrimeVue
      (() => {
            try {
              const config = getCookie('primo-config')
              const decodedConfig = decodeURIComponent(config)
              const { primary, surface } = JSON.parse(decodedConfig)

              let primitiveHTML = document.querySelector('style[data-primevue-style-id="primitive-variables"]')?.innerHTML
              let semanticHTML = document.querySelector('style[data-primevue-style-id="semantic-variables"]')?.innerHTML

              if (primitiveHTML && semanticHTML) {
                const nums = [50,100,200,300,400,500,600,700,800,900,950]
                nums.forEach(num => {
                    const primitivePrimaryReg = new RegExp('--p-' + primary + '-' + num + ':([^;]*);')
                    const primitiveSurfaceReg = new RegExp('--s-' + surface + '-' + num + ':([^;]*);')
                    const semanticPrimaryReg = new RegExp('--p-primary-' + num + ':([^;]*);')
                    const semanticSurfaceReg = new RegExp('--s-surface-' + num + ':([^;]*);')
                    const primitivePrimaryValue = primitiveHTML.match(primitivePrimaryReg)?.[1]
                    const primitiveSurfaceValue = primitiveHTML.match(primitiveSurfaceReg)?.[1]
                    const semanticParmiryValue = semanticHTML.match(semanticPrimaryReg)?.[1]
                    const semanticSurfaceValue = semanticHTML.match(semanticSurfaceReg)?.[1]
                    if (primitivePrimaryValue && semanticParmiryValue) {
                      semanticHTML = semanticHTML.replace(semanticPrimaryReg, '--p-primary-' + num + ':' + primitivePrimaryValue + ';')
                    }
                    if (primitiveSurfaceValue && semanticSurfaceValue) {
                      semanticHTML = semanticHTML.replace(semanticSurfaceReg, '--s-surface-' + num + ':' + primitiveSurfaceValue + ';')
                    }
                })
                document.querySelector('style[data-primevue-style-id="semantic-variables"]').innerHTML = semanticHTML
              }

              function getCookie(name) {
                const value = '; ' + window.document.cookie
                const parts = value.split('; ' + name + '=')
                if (parts.length === 2) {
                  return parts.pop()?.split(';').shift()
                }
              }
            }
            catch (error) {
              console.error(error)
            }
        })();
    </script>`
    html.head.push(str)

    return Promise.resolve()
  })
})
