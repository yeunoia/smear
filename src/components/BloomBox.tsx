import { ReactElement, useId, useRef } from "react"
import { getRectSize, getRx } from "../utils/calculate.utils"
import { useTypeBox } from "../hooks/useTypeBox"
import { useAnimateBox } from "../hooks/useAnimateBox"
import { Defs } from "./Defs"
import { BloomProps } from "../Bloom"

export const BloomBox = ({
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
  const rectRef = useRef<SVGRectElement>(null)

  const { w, h } = useTypeBox(anchorRef)

  useAnimateBox({
    rectRef,
    animated,
    delay,
    duration,
    tip,
    messiness,
    width: w,
    height: h,
  })
  const { width: rw, height: rh } = getRectSize(w, h, paddingX, paddingY)

  return (
    <span
      ref={anchorRef}
      style={{
        position: "relative",
        display: "inline-block",
        width: "fit-content",
        isolation: "isolate",
      }}
    >
      {w > 0 && h > 0 && (
        <svg
          width={w}
          height={h}
          style={{
            position: "absolute",
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          <Defs
            id={`${uid}-box`}
            scale={messiness}
            gradientId={`${uid}-box-gradient`}
            gradient={gradient}
          />
          <rect
            ref={rectRef}
            x={-paddingX}
            y={-paddingY}
            width={rw}
            height={rh}
            rx={getRx(h, tip, paddingY)}
            fill={
              gradient.length > 0
                ? `url(#${uid}-box-gradient)`
                : backgroundColor
            }
            filter={`url(#${uid}-box)`}
          />
        </svg>
      )}
      <span ref={textRef} style={{ position: "relative", color }}>
        {children}
      </span>
    </span>
  )
}
