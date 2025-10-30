import type { Viewer } from 'cesium'
import type { InjectionKey, ShallowRef } from 'vue'
import type { Awaitable } from '~shared/general'
import {
  getCurrentInstance,
  inject,

  onMounted,
  provide,
  ref,

  shallowRef,
  toValue,
} from 'vue'
import { error, throwError } from '~shared/errorHandler'
import { isPromise, noop } from '~shared/general'

// Injection key
const INJECT_KEY_VIEWER: InjectionKey<ShallowRef<Viewer | undefined>> = Symbol('viewer')

// Error messages
const CANNOT_GET_SETUP_CONTEXT = 'Failed to get viewer because cannot get setup context.'
const UNDEFINED_VIEWER = 'Failed to get viewer because viewer is undefined now.'

export type UseViewerParam = 'throw-error' | 'no-throw-error' | 'silent'

/**
 * Get `viewer` from the context.
 *
 * ## example
 * ```js
 * const viewer = useViewer() // strictly check viewer is existence
 * const viewerMaybeUndefined = useViewer('silent')
 * ```
 */
export function useViewer(): Viewer
export function useViewer(isThrowError: UseViewerParam = 'throw-error'): Viewer | undefined {
  const errorMap = {
    'throw-error': (str: string) => throwError(str),
    'no-throw-error': (str: string) => error(str),
    'silent': noop,
  }
  if (!getCurrentInstance())
    errorMap[isThrowError](CANNOT_GET_SETUP_CONTEXT)

  const viewerInject = toValue(inject(INJECT_KEY_VIEWER, undefined))

  if (!viewerInject)
    errorMap[isThrowError](UNDEFINED_VIEWER)

  return viewerInject
}

/**
 * Accept a callback which will be called in `onMounted` hook and return a `Cesium.Viewer` instance. It can also be a async function.
 *
 * ## example
 * ```js
 * // normal
 * useViewerProvider(() => new Cesium.Viewer(container.value))
 *
 * // async callback
 * useViewerProvider(async () => {
 *   await fetch('/my/data')
 *   const viewer = new Cesium.Viewer(container.value)
 *   return viewer
 * })
 *
 * // returns
 * const { isMounted, viewer } = useViewerProvider(() => new Cesium.Viewer(container.value))
 * ```
 */
export function useViewerProvider(fn: () => Awaitable<Viewer>) {
  const viewer = shallowRef<Viewer>()

  /** `True` when viewer has been mounted */
  const isMounted = ref(false)

  const setViewer = (v: Viewer) => {
    viewer.value = v
    isMounted.value = true
  }
  onMounted(() => {
    const val = fn()

    isPromise(val)
      ? val.then(v => setViewer(v as Viewer))
      : setViewer(val as Viewer)
  })

  provide(INJECT_KEY_VIEWER, viewer)

  return {
    isMounted,
    viewer,
  }
}
