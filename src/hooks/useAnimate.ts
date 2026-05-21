import { type RefObject, useEffect } from "react"
import { BloomProps } from "../Bloom"

type Props = {
  rectRef: RefObject<SVGRectElement>
  width: number
  height: number
} & Required<
  Pick<BloomProps, "animated" | "delay" | "duration" | "tip" | "messiness">
>

export const useAnimate = ({
  rectRef,
  animated,
  delay,
  duration,
  tip,
  messiness,
  width,
  height,
}: Props) => {
  const radius = tip === "round" ? 9999 : 0

  useEffect(() => {
    if (!animated || !rectRef.current) return

    rectRef.current.animate(
      [
        { clipPath: `inset(0 100% 0 0 round 0 ${radius}px ${radius}px 0)` },
        { clipPath: `inset(0 0% -${messiness}px 0 round 0)` },
      ],
      { duration: duration * 1000, delay: delay * 1000, fill: "both" },
    )
  }, [animated, duration, delay, width, height, messiness])
}
