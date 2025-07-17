import type { EventBusKey } from '@vueuse/core'

export const GetOpenIdDoneEventBusKeyConst: EventBusKey<{ openId: string }> = Symbol('GetOpenIdDoneEventBusKeyConst')
