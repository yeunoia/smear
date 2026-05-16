import { RefObject, useEffect, useState } from "react"
import { ContentType } from "../Smear"

type LineRect = {
  top: number
  left: number
  width: number
  height: number
}

export const useTypeLine = (
  ref: RefObject<HTMLSpanElement>,
  textRef: RefObject<HTMLSpanElement>,
  type: ContentType,
) => {
  const [rects, setRect] = useState<LineRect[]>([])

  useEffect(() => {
    if (type !== "line" || !ref?.current || !textRef?.current) return

    const el = ref.current
    const textEl = textRef.current

    const calculate = () => {
      const range = document.createRange()
      range.selectNodeContents(textEl)

      const outerRect = el.getBoundingClientRect()
      const lineRects = Array.from(range.getClientRects()).map((rect) => ({
        top: rect.top - outerRect.top,
        left: rect.left - outerRect.left,
        width: rect.width,
        height: rect.height,
      }))
      setRect(lineRects)
    }

    calculate()

    let animationId: number
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(calculate)
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [ref, type])

  return { rects }
}