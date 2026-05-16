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
    const calculateReady = () => {
      cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(calculate)
    }

    const observer = new ResizeObserver(calculateReady)
    observer.observe(el)
    window.addEventListener("resize", calculateReady)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", calculateReady)
      cancelAnimationFrame(animationId)
    }
  }, [ref, type])

  return { rects }
}