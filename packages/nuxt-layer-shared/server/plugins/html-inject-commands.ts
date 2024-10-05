import { exec } from 'node:child_process'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    const commands = [
      {
        name: 'git:commit',
        command: 'git log -1 --format="hash=%h, date=%aI"',
        errorMsg: 'Failed to get git commit hash',
      },
    ]

    const getMetaTag = (name: string, content: string): string => {
      return `<meta name="${name}" content="${content}">`
    }

    const tasks = commands.map(({ name, command, errorMsg }) => {
      return new Promise<string>((resolve) => {
        exec(command, (error, stdout) => error
          ? resolve(getMetaTag(name, errorMsg ?? `Failed to excute command: ${command}`))
          : resolve(getMetaTag(name, `${stdout.trim()}`)))
      })
    })

    return Promise.all(tasks).then((tags) => {
      html.head.push(...tags)
    })
  })
})
