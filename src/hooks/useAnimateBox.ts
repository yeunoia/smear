import { type RefObject, useEffect } from "react"
import { BloomProps } from "../Bloom"
import { getAnimationKeyframes } from "../utils/calculate.utils"

type Props = {
  rectRef: RefObject<SVGRectElement>
  width: number
  height: number
} & Required<
  Pick<BloomProps, "animated" | "delay" | "duration" | "tip" | "messiness">
>

export const useAnimateBox = ({
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

    rectRef.current.animate(getAnimationKeyframes(radius, messiness), {
      duration: duration * 1000,
      delay: delay * 1000,
      fill: "both",
    })
  }, [animated, duration, delay, width, height, messiness])
}
