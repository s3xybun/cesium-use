import { isObject, objectKeys } from './fnclip'

export * from './fnclip'

/** merge in 2 depth */
export function mergeDeep<T extends AnyObject = AnyObject, S extends AnyObject = T>(obj: T, ...args: S[]) {
  return args.reduce((acc, arg) => {
    objectKeys(arg).forEach((key) => {
      if (isObject(arg[key]) && isObject((acc as any)[key]))
        Object.assign((acc as any)[key], arg[key])
      else
        (acc as any)[key] = arg[key]
    })
    return acc
  }, obj)
}

export function noop() {}

export type Nullable<T> = T | null | undefined

export type Awaitable<T> = T | PromiseLike<T>

export type AnyObject = Record<PropertyKey, any>

export function at<T>(arr: T[], index: number) {
  return arr[index < 0 ? arr.length + index : index]
}
