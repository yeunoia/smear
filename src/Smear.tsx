import { ReactNode, useRef } from "react"
import { useTypeBox } from "./hooks/useTypeBox"
import { useTypeLine } from "./hooks/useTypeLine"
import { getRectSize, getRx } from "./utils/calculate.utils"

export type ContentType = "box" | "line"
export type TipType = "round" | "square"

export type SmearProps = {
  children: ReactNode
  /**
   * @default round
   */
  tip?: TipType
  /**
   * @default box
   */
  type?: ContentType
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

export const Smear = ({
  children,
  tip = "round",
  type = "box",
  scale = 4,
  backgroundColor = "#A4E7D5B3",
  color = "inherit",
  paddingX = 4,
  paddingY = 2,
}: SmearProps) => {
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
            const filterId = `smear-filter-line-${i}`
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
                <Defs id={filterId} scale={scale} />
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
                  fill={backgroundColor}
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
          <Defs id="smear-filter-box" scale={scale} />
          <rect
            x={-paddingX}
            y={-paddingY}
            width={getRectSize(w, h, paddingX, paddingY).width}
            height={getRectSize(w, h, paddingX, paddingY).height}
            rx={getRx(h, tip, paddingY)}
            fill={backgroundColor}
            filter="url(#smear-filter-box)"
          />
        </svg>
      )}
      <span ref={textRef} style={{ position: "relative", color }}>
        {children}
      </span>
    </span>
  )
}

const Defs = ({ id, scale }: { id: string; scale: number }) => {
  return (
    <defs>
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
