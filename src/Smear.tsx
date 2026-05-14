import { ReactNode, useRef } from "react"
import { useContentSize } from "./useContentSize"

export type SmearProps = {
  children: ReactNode
  /**
   * @default round
   */
  tip?: "round" | "flat"
  /**
   * @default #A4E7D5
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
  backgroundColor = "#A4E7D5",
  color = "inherit",
  paddingX = 4,
  paddingY = 2,
}: SmearProps) => {
  const contentRef = useRef<HTMLSpanElement>(null)
  const { w, h } = useContentSize(contentRef)

  const rx = tip === "round" ? (h + paddingY) / 2 : 1

  return (
    <span
      ref={contentRef}
      style={{
        position: "relative",
        display: "inline-block",
        width: "fit-content",
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
          <defs>
            <filter id="smear-filter">
              <feTurbulence baseFrequency={0.015} numOctaves={5} seed={0} />
              <feDisplacementMap
                in="SourceGraphic"
                scale={8}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
          <rect
            x={-paddingX}
            y={-paddingY}
            width={w + paddingX}
            height={h + paddingY}
            rx={rx}
            fill={backgroundColor}
            filter="url(#smear-filter)"
          />
        </svg>
      )}
      <span style={{ position: "relative", color }}>{children}</span>
    </span>
  )
}
