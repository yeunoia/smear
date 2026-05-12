import { ReactNode, useRef } from "react"
import { useContentSize } from "./useContentSize"

export type SmearProps = {
  children: ReactNode
  /**
   * @default #A4E7D5
   */
  backgroundColor?: string
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
  backgroundColor = "#A4E7D5",
  paddingX = 4,
  paddingY = 2,
}: SmearProps) => {
  const contentRef = useRef<HTMLSpanElement>(null)
  const { w, h } = useContentSize(contentRef)

  return (
    <span
      ref={contentRef}
      style={{ position: "relative", display: "inline-block" }}
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
              <feTurbulence baseFrequency={0.003} numOctaves={5} seed={0} />
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
            rx={(h + paddingY) / 2.5}
            fill={backgroundColor}
            filter="url(#smear-filter)"
          />
        </svg>
      )}
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  )
}
