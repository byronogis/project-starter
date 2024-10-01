export interface SakaiTopbarExtraActionItem {
  icon: string
  label: string
  /**
   * 顺序 \
   * 用于 flex 排序
   */
  order?: number
  onClick: (e: MouseEvent) => (Promise<void> | void)
  /**
   * 点击时是否关闭扩展按钮弹出层 \
   * begining: 点击方法执行前即关闭弹出层 \
   * end: 点击方法执行后关闭弹出层, 失败时不关闭 \
   * end-force: 点击方法执行后关闭弹出层, 失败时也关闭
   */
  closePopover?: 'begining' | 'end' | 'end-force'
  /**
   * 是否自定义内容 \
   * 需要传入 h 函数 (VNode)
   */
  custom?: VNode
}
