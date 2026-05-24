import { ReactElement, ReactNode } from "react"
import { BloomBox } from "./components/BloomBox"
import { BloomLine } from "./components/BloomLine"

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
   * @default 0.6 seconds
   */
  duration?: number
}

export const Bloom = ({
  children,
  tip = "round",
  type = "box",
  messiness = 4,
  backgroundColor = "#A4E7D5B3",
  gradient = [],
  color = "inherit",
  paddingX = 4,
  paddingY = 2,
  animated = false,
  delay = 0.2,
  duration = 0.6,
}: BloomProps): ReactElement => {
  const bloomProps: Required<Omit<BloomProps, "type">> = {
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
  }
  return type === "line" ? (
    <BloomLine {...bloomProps}>{children}</BloomLine>
  ) : (
    <BloomBox {...bloomProps}>{children}</BloomBox>
  )
}
