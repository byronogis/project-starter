import {
  createDefu,
  // defuArrayFn,
  // defuFn,
} from 'defu'
import { describe, expect, it } from 'vitest'
import { merge } from '.'

// const filterDist = (val: string[]) => val.filter(i => i !== 'dist')
// const filterTest = (val: string[]) => val.filter(i => i !== 'test')
// const filterTemp = (val: string[]) => val.filter(i => i !== '.temp')
// const addTwenty = (val: number) => val + 20
// const addTen = (val: number) => val + 10
// const returnTwenty = () => 20

describe('merge', () => {
  it('should respect leftmost defaults priority', () => {
    const result = merge(
      {},
      { a: 1, b: 1, c: 1 },
      { a: 2, b: 2, d: 2 },
      { a: 3, b: 3, e: 3 },
      { a: 4, f: 4 },
      { g: 5 },
    )
    expect(result).toEqual({
      a: 1, // 最高优先级
      b: 1, // 最高优先级
      c: 1, // 仅在第一个对象中存在
      d: 2, // 在第二个对象中定义
      e: 3, // 在第三个对象中定义
      f: 4, // 在第四个对象中定义
      g: 5, // 在最后一个对象中定义
    })
  })

  it('should handle empty arguments', () => {
    const result = merge({})
    expect(result).toEqual({})
  })

  it('should work with arrays', () => {
    const result = merge(
      {},
      { arr: [1, 2], brr: ['a'] },
      { arr: [3, 4], brr: ['b'], crr: ['x'] },
      { arr: [5, 6], crr: ['y'] },
      { arr: [7, 8] },
    )
    expect(result).toEqual({
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
      brr: ['a', 'b'],
      crr: ['x', 'y'],
    })
  })

  it('should work with custom merger', () => {
    const customMerger = createDefu((obj, key, value) => {
      if (typeof obj[key] === 'number' && typeof value === 'number') {
        // @ts-expect-error 不能将类型“number”分配给类型“T[keyof T]”。
        obj[key] += value
        return true // 返回 true 表示已应用自定义合并策略
      }
      return false
    })

    const result = merge(
      { merger: customMerger },
      { count: 10 },
      { count: 20 },
      { count: 80 },
    )
    expect(result).toEqual({ count: 110 })
  })

  it('should handle nested objects with correct priority', () => {
    const result = merge(
      {},
      {
        a: { b: 1, c: 1 },
        x: { y: 1 },
      },
      {
        a: { b: 2, d: 2 },
        x: { z: 2 },
      },
      {
        a: { e: 3 },
        x: { y: 3 },
      },
    )
    expect(result).toEqual({
      a: {
        b: 1, // 保持第一个对象的值
        c: 1, // 仅在第一个对象中存在
        d: 2, // 从第二个对象合并
        e: 3, // 从第三个对象合并
      },
      x: {
        y: 1, // 保持第一个对象的值
        z: 2, // 从第二个对象合并
      },
    })
  })

  // it('should work with defuFn merger', () => {
  //   const result = merge(
  //     { merger: defuFn },
  //     {
  //       count: addTwenty,
  //       num: addTen,
  //       items: filterDist,
  //     },
  //     {
  //       count: 10,
  //       num: 5,
  //       items: ['node_modules', 'dist', 'test'],
  //     },
  //     {
  //       count: 5,
  //       num: 3,
  //       items: ['temp', 'dist'],
  //     },
  //   )
  //   // TODO https://github.com/unjs/defu/issues/139
  //   expect(result).toEqual({
  //     count: 30, // 10 + 20
  //     num: 15, // 5 + 10
  //     items: ['node_modules', 'test', 'temp'], // 过滤掉 dist
  //   })
  // })

  // it('should work with defuArrayFn merger', () => {
  //   const result = merge(
  //     { merger: defuArrayFn },
  //     {
  //       items: filterDist,
  //       files: filterTest,
  //       temp: filterTemp,
  //       count: returnTwenty,
  //     },
  //     {
  //       items: ['node_modules', 'dist', 'test'],
  //       files: ['src', 'test', 'dist'],
  //       temp: ['.temp', 'cache'],
  //       count: 10,
  //     },
  //     {
  //       items: ['temp', 'dist'],
  //       files: ['docs', 'test'],
  //       temp: ['.git', '.temp'],
  //     },
  //   )

  //   // TODO https://github.com/unjs/defu/issues/139
  //   expect(result).toEqual({
  //     items: ['node_modules', 'test', 'temp'],
  //     files: ['src', 'dist', 'docs'],
  //     temp: ['cache', '.git'],
  //     count: returnTwenty,
  //   })
  // })

  it('should skip null and undefined values', () => {
    const result = merge(
      {},
      { a: null, b: undefined, c: 1 },
      { a: 2, b: 3, c: null },
    )
    expect(result).toEqual({ a: 2, b: 3, c: 1 })
  })
})
