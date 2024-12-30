import type { NuxtOptions } from '@nuxt/schema'

export const htmlInjectCommands: NuxtOptions['htmlInjectCommands'] = {
  commands: [
    {
      name: 'git:commit',
      command: 'git log -1 --format="hash=%h, date=%aI"',
      errorMsg: 'Failed to get git commit hash',
    },
  ],
}
