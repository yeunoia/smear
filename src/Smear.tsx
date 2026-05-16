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
  tip?:TipType
  /**
   * @default box
   */
  type?: ContentType
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
  backgroundColor = "#A4E7D5B3",
  color = "inherit",
  paddingX = 4,
  paddingY = 2,
}: SmearProps) => {

  const contentRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const { w, h } = useTypeBox(contentRef, type)
  const { rects } = useTypeLine(contentRef, textRef, type)

  const display = type === "box" ? "inline-block" : "inline"


  return (
    <span
      ref={contentRef}
      style={{
        position: "relative",
        display,
        width: "fit-content",
        isolation: "isolate",
      }}
    >
      {w > 0 && h > 0 && type === "box" && (
        <svg
          width={w}
          height={h}
          style={{
            position: "absolute",
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          <Defs id="smear-filter-box" />
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

      {type === "line" &&
        rects.map((rect, i) => {
          const filterId = `smear-filter-line-${i}`

          return (
            <svg
              key={i}
              width={rect.width}
              height={rect.height}
              style={{
                position: "absolute",
                top: rect.top,
                left: rect.left,
                pointerEvents: "none",
                overflow: "visible",
                zIndex: -1,
              }}
            >
              <Defs id={filterId} />
              <rect
                x={-paddingX}
                y={-paddingY}
                width={getRectSize(rect.width, rect.height, paddingX, paddingY).width}
                height={getRectSize(rect.width, rect.height, paddingX, paddingY).height}
                rx={getRx(rect.height, tip, paddingY)}
                fill={backgroundColor}
                filter={`url(#${filterId})`}
              />
            </svg>
          )
        })}

      <span ref={textRef} style={{ position: "relative", color }}>{children}</span>
    </span>
  )
}


const Defs = ({ id }: { id: string }) => {
  return (
    <defs>
      <filter id={id}>
        <feTurbulence baseFrequency={0.015} numOctaves={5} seed={0} />
        <feDisplacementMap
          in="SourceGraphic"
          scale={8}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  )
}