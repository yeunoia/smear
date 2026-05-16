import { TipType } from "../Bloom"

export const getRx = (height: number, tip: TipType, paddingY: number) => {
  return tip === "round" ? (height + paddingY) / 2 : 1
}

export const getRectSize = (width: number, height: number, paddingX: number, paddingY: number) => {
  return {
    width: width + paddingX * 2,
    height: height + paddingY * 2,
  }
}