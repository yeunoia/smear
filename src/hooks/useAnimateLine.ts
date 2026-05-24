import { type RefObject, useEffect } from "react"
import { BloomProps } from "../Bloom"
import { getAnimationKeyframes } from "../utils/calculate.utils"

type Props = {
  lineRectRefs: RefObject<SVGRectElement[]>
  count: number
} & Required<
  Pick<BloomProps, "animated" | "delay" | "duration" | "tip" | "messiness">
>

export const useAnimateLine = ({
  lineRectRefs,
  animated,
  delay,
  duration,
  tip,
  messiness,
  count,
}: Props) => {
  const radius = tip === "round" ? 9999 : 0

  useEffect(() => {
    if (!animated || !lineRectRefs?.current) return

    lineRectRefs.current.forEach((el, i) => {
      if (!el) return
      el.animate(getAnimationKeyframes(radius, messiness), {
        duration: duration * 1000,
        delay: (delay + i * duration) * 1000,
        fill: "both",
      })
    })
  }, [animated, duration, delay, messiness, count, radius])
}
