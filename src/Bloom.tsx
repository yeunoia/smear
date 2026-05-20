import { ReactElement, ReactNode, useId, useRef } from "react"
import { useTypeBox } from "./hooks/useTypeBox"
import { useTypeLine } from "./hooks/useTypeLine"
import { getRectSize, getRx } from "./utils/calculate.utils"
import { Defs } from "./components/Defs"
import { AnimatedStyle } from "./components/AnimatedStyle"

export type BloomProps = {
  children: ReactNode
  /**
   * @default round
   */
  tip?: "round" | "square"
  /**
   * @default box
   */
  type?: "box" | "line"
  /**
   * @default 4
   * recommended range: 1-10
   */
  messiness?: number
  /**
   * @default #A4E7D5B3
   */
  backgroundColor?: string
  /**
   * Array of colors for a linear gradient fill (left to right).
   * Overrides backgroundColor when provided.
   */
  gradient?: string[]
  /**
   * @default inherit
   */
  color?: string
  /**
   * @default 4
   */
  paddingX?: number
  /**
   * @default 2
   */
  paddingY?: number
  /**
   * @default false
   */
  animated?: boolean
  /**
   * @default 0.2 seconds
   */
  delay?: number
  /**
   * @default 2 seconds
   */
  duration?: number
}

export const Bloom = ({
  children,
  tip = "round",
  type = "box",
  messiness = 4,
  backgroundColor = "#A4E7D5B3",
  gradient,
  color = "inherit",
  paddingX = 4,
  paddingY = 2,
  animated = false,
  delay = 0.2,
  duration = 2,
}: BloomProps): ReactElement => {
  const uid = useId()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const { w, h } = useTypeBox(anchorRef, type)
  const { rects } = useTypeLine(anchorRef, textRef, type)

  if (type === "line") {
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
            isolation:'isolate'
          }}
        >
          {rects.map((rect, i) => {
            const filterId = `${uid}-line-${i}`
            const gradientId = `${uid}-line-gradient-${i}`

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
                  x={-paddingX}
                  y={-paddingY}
                  width={
                    getRectSize(rect.width, rect.height, paddingX, paddingY)
                      .width
                  }
                  height={
                    getRectSize(rect.width, rect.height, paddingX, paddingY)
                      .height
                  }
                  rx={getRx(rect.height, tip, paddingY)}
                  fill={gradient ? `url(#${gradientId})` : backgroundColor}
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

  const { width: rw, height: rh } = getRectSize(w, h, paddingX, paddingY)
  const animName = `bloom-${uid.replace(/:/g, "")}`

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

          {animated && <AnimatedStyle uid={uid} radius={rw}/>}

          <rect
            x={-paddingX}
            y={-paddingY}
            width={rw}
            height={rh}
            rx={getRx(h, tip, paddingY)}
            fill={gradient ? `url(#${uid}-box-gradient)` : backgroundColor}
            filter={`url(#${uid}-box)`}
            style={animated ? {
              animation: `${animName} ${duration}s ease ${delay}s both`,
            } : undefined}
          />
        </svg>
      )}
      <span ref={textRef} style={{ position: "relative", color }}>
        {children}
      </span>
    </span>
  )
}

