import { type RefObject, useEffect, useState } from "react"

export const useTypeBox = (ref: RefObject<HTMLSpanElement>) => {
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect

      if (width === 0 || height === 0) {
        throw new Error("Bloom: size can not be 0.")
      }

      setSize({ w: width, h: height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return size
}
