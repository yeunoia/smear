type Props = {
  uid: string
  radius?: number
}

export const AnimatedStyle = ({ uid, radius = 50 }: Props) => {
  const animName = `bloom-${uid.replace(/:/g, "")}`

  return (
    <style>{`
      @keyframes ${animName} {
        from { clip-path: inset(0 100% 0 0 round ${radius * 2}px); }
        to   { clip-path: inset(0 0% 0 0); }
      }
    `}</style>
  )
}
