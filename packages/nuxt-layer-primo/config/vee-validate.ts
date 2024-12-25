import type { NuxtOptions } from '@nuxt/schema'

export const veeValidate: NuxtOptions['vee-validate'] = {
  componentNames: {
    Form: 'VeeForm',
    Field: 'VeeField',
    FieldArray: 'VeeFieldArray',
    ErrorMessage: 'VeeErrorMessage',
  },
}
