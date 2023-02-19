> [antd 按需加载](https://www.antdv.com/docs/vue/getting-started-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)

如果你使用的 Vite，你可以使用 unplugin-vue-components 来进行按需加载。但是此插件无法处理非组件模块，如 message，这种组件需要手动加载：

```js
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css' // vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
```

## Solution 解决方案

手动包装非组件模块，将包装后的插件文件夹，包含在 `unplugin-auto-import` 中，以全局自动按需引入
