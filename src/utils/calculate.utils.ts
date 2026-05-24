import { type BloomProps } from "../Bloom"

export const getRx = (
  height: number,
  tip: BloomProps["tip"],
  paddingY: number,
) => {
  return tip === "round" ? (height + paddingY) / 2 : 1
}

export const getRectSize = (
  width: number,
  height: number,
  paddingX: number,
  paddingY: number,
) => {
  return {
    width: width + paddingX * 2,
    height: height + paddingY * 2,
  }
}
export const getAnimationKeyframes = (radius: number, messiness: number) => {
  return [
    { clipPath: `inset(0 100% 0 0 round 0 ${radius}px ${radius}px 0)` },
    { clipPath: `inset(-${messiness}px)` },
  ]
}
