import { ReactElement, useId, useRef } from "react"
import { getRectSize, getRx } from "../utils/calculate.utils"
import { Defs } from "./Defs"
import { useTypeLine } from "../hooks/useTypeLine"
import { useAnimateLine } from "../hooks/useAnimateLine"
import { BloomProps } from "../Bloom"

export const BloomLine = ({
  children,
  tip,
  messiness,
  backgroundColor,
  gradient,
  color,
  paddingX,
  paddingY,
  animated,
  delay,
  duration,
}: Required<Omit<BloomProps, "type">>): ReactElement => {
  const uid = useId()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const lineRectRefs = useRef<SVGRectElement[]>([])

  const { rects } = useTypeLine(anchorRef, textRef)

  useAnimateLine({
    lineRectRefs,
    animated,
    delay,
    duration,
    tip,
    messiness,
    count: rects.length,
  })

  return (
    <>
      <span
        ref={anchorRef}
        aria-hidden
        style={{
          display: "inline-block",
          width: 0,
          height: 0,
          overflow: "visible",
          position: "relative",
          isolation: "isolate",
        }}
      >
        {rects.map((rect, i) => {
          const filterId = `${uid}-line-${i}`
          const gradientId = `${uid}-line-gradient-${i}`

          const { width: rw, height: rh } = getRectSize(
            rect.width,
            rect.height,
            paddingX,
            paddingY,
          )

          return (
            <svg
              key={filterId}
              width={rect.width}
              height={rect.height}
              style={{
                position: "absolute",
                top: rect.top,
                left: rect.left,
                pointerEvents: "none",
                overflow: "visible",
              }}
            >
              <Defs
                id={filterId}
                scale={messiness}
                gradientId={gradientId}
                gradient={gradient}
              />
              <rect
                ref={(el) => {
                  if (el) lineRectRefs.current[i] = el
                }}
                x={-paddingX}
                y={-paddingY}
                width={rw}
                height={rh}
                rx={getRx(rect.height, tip, paddingY)}
                fill={
                  gradient.length > 0 ? `url(#${gradientId})` : backgroundColor
                }
                filter={`url(#${filterId})`}
              />
            </svg>
          )
        })}
      </span>
      <span ref={textRef} style={{ position: "relative", color }}>
        {children}
      </span>
    </>
  )
}
