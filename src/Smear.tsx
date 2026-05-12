import { ReactNode, useRef } from "react"
import { useContentSize } from "./useContentSize"

export const Smear = ({ children }: { children: ReactNode }) => {
  const contentRef = useRef<HTMLSpanElement>(null)
  const { w, h } = useContentSize(contentRef)

  if (w === 0 || h === 0) {
    return null
  }

  return (
    <span
      ref={contentRef}
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <svg
        width={w}
        height={h}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </span>
  )
}
