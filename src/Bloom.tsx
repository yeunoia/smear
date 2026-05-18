import { ReactElement, ReactNode, useId, useRef } from "react"
import { useTypeBox } from "./hooks/useTypeBox"
import { useTypeLine } from "./hooks/useTypeLine"
import { getRectSize, getRx } from "./utils/calculate.utils"


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
  scale?: number
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
}

export const Bloom = ({
  children,
  tip = "round",
  type = "box",
  scale = 4,
  backgroundColor = "#A4E7D5B3",
  gradient,
  color = "inherit",
  paddingX = 4,
  paddingY = 2,
}: BloomProps): ReactElement => {
  const uid = useId()
  const outerRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const { w, h } = useTypeBox(outerRef, type)
  const { rects } = useTypeLine(outerRef, textRef, type)

  if (type === "line") {
    return (
      <>
        <span
          ref={outerRef}
          aria-hidden
          style={{
            display: "inline-block",
            width: 0,
            height: 0,
            overflow: "visible",
            position: "relative",
            zIndex: 0,
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
                <Defs id={filterId} scale={scale} gradientId={gradientId} gradient={gradient} />
                <rect
                  x={-paddingX}
                  y={-paddingY}
                  width={getRectSize(rect.width, rect.height, paddingX, paddingY).width}
                  height={getRectSize(rect.width, rect.height, paddingX, paddingY).height}
                  rx={getRx(rect.height, tip, paddingY)}
                  fill={gradient ? `url(#${gradientId})` : backgroundColor}
                  filter={`url(#${filterId})`}
                />
              </svg>
            )
          })}
        </span>
        <span ref={textRef} style={{ position: "relative", zIndex: 1, color }}>
          {children}
        </span>
      </>
    )
  }

  return (
    <span
      ref={outerRef}
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
          <Defs id={`${uid}-box`} scale={scale} gradientId={`${uid}-box-gradient`} gradient={gradient} />
          <rect
            x={-paddingX}
            y={-paddingY}
            width={getRectSize(w, h, paddingX, paddingY).width}
            height={getRectSize(w, h, paddingX, paddingY).height}
            rx={getRx(h, tip, paddingY)}
            fill={gradient ? `url(#${uid}-box-gradient)` : backgroundColor}
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

const Defs = ({ id, scale, gradientId, gradient }: { id: string; scale: number; gradientId?: string; gradient?: string[] }) => {
  return (
    <defs>
      {gradient && gradientId && (
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          {gradient.map((color, i) => (
            <stop key={i} offset={`${(i / (gradient.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
      )}
      <filter id={id}>
        <feTurbulence baseFrequency={0.015} numOctaves={5} seed={0} />
        <feDisplacementMap
          in="SourceGraphic"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  )
}
