import { type RefObject, useEffect, useState } from "react"
import { ContentType } from "../Bloom"

/**
 * @returns
 * the content size of an element.
 */
export const useTypeBox = (ref: RefObject<HTMLSpanElement>, type: ContentType) => {
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    if(type==='line') return;

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
  }, [ref, type])

  return size
}
