import { useRef, useEffect } from 'react'

export function useDebouncedCallback<T extends (...args: any[]) => void>(cb: T, delay = 500) {
  const cbRef = useRef(cb)
  useEffect(() => {
    cbRef.current = cb
  }, [cb])

  const timeoutRef = useRef<number | undefined>(undefined)

  function callback(...args: Parameters<T>) {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeoutRef.current = window.setTimeout(() => cbRef.current(...args), delay)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  return callback as (...args: Parameters<T>) => void
}

export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 500) {
  let t: number | undefined
  return (...args: Parameters<T>) => {
    if (t !== undefined) clearTimeout(t)
    // @ts-ignore -- window.setTimeout returns number in browsers
    t = window.setTimeout(() => fn(...args), wait)
  }
}
