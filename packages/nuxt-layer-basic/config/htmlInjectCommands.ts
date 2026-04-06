import type { NuxtOptions } from '@nuxt/schema'

export const htmlInjectCommands: Exclude<NuxtOptions['htmlInjectCommands'], false> = {
  commands: [
    {
      name: 'git:commit',
      command: 'git log -1 --format="hash=%h, date=%aI"',
      errorMsg: 'Failed to get git commit hash',
    },
  ],
}
