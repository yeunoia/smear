import { RefObject, useEffect, useState } from "react"

type LineRect = {
  top: number
  left: number
  width: number
  height: number
}

export const useTypeLine = (
  anchorRef: RefObject<HTMLSpanElement>,
  textRef: RefObject<HTMLSpanElement>,
) => {
  const [rects, setRects] = useState<LineRect[]>([])

  useEffect(() => {
    if (!anchorRef?.current || !textRef?.current) return

    const anchorEl = anchorRef.current
    const textEl = textRef.current

    const calculate = () => {
      const range = document.createRange()
      range.selectNodeContents(textEl)

      const anchorRect = anchorEl.getBoundingClientRect()
      const lineRects = Array.from(range.getClientRects()).map((rect) => ({
        top: rect.top - anchorRect.top,
        left: rect.left - anchorRect.left,
        width: rect.width,
        height: rect.height,
      }))
      setRects(lineRects)
    }

    calculate()

    let animationId: number
    const scheduleCalculate = () => {
      cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(calculate)
    }

    const observer = new ResizeObserver(scheduleCalculate)
    observer.observe(textEl)
    window.addEventListener("resize", scheduleCalculate)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", scheduleCalculate)
      cancelAnimationFrame(animationId)
    }
  }, [anchorRef, textRef])

  return { rects }
}
