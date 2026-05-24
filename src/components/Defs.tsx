export const Defs = ({
  id,
  scale,
  gradientId,
  gradient,
}: {
  id: string
  scale: number
  gradientId?: string
  gradient?: string[]
}) => {
  return (
    <defs>
      {gradient && gradientId && (
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          {gradient.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (gradient.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      )}
      <filter id={id}>
        <feTurbulence baseFrequency={0.015} numOctaves={5} seed={0} />
        <feDisplacementMap
          in="SourceGraphic"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  )
}
