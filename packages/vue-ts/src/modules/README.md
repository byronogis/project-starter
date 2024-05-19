## Modules

A custom user module system. Place a `.ts` file with the following template, it will be installed automatically.

```ts
import type { App } from 'vue'

export function install(app: App) {
  // do something
  // @see https://cn.vuejs.org/guide/reusability/plugins.html
}
```
