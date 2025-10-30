export default defineConfig({
  dir: 'src/shared/fnclip',
})

interface ConfigOptions {
  /** If enable TypeScript mode */
  ts: boolean
  /** If generate index file to export functions */
  index: boolean
  /** The path of index file */
  indexPath: string
  /** The target folder */
  dir: string
  /** The base path */
  cwd: string
  /** For `list`: List all functions */
  remote: boolean
}
type Callable<T> = T | ((...args: any[]) => T)
function defineConfig(opts: Callable<Partial<ConfigOptions>>) {
  return opts
}
