export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

// 扩展 uni 全局类型
declare global {
  interface Uni {
    /**
     * 由小程序的 canvas 组件驱动模拟的动画帧执行
     */
    _animationFrameMock?: AnimationFrameMock
  }
}
