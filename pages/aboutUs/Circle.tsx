import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

type CircleProps = {
  diameter: number
  color: string
  strokeWidth: number
  path: string
}

const Circle: React.FC<CircleProps> = ({
  diameter,
  color,
  strokeWidth,
  path,
}) => {
  const [hovered, setHovered] = useState(false)

  const { d, stroke, fill } = useSpring({
    d: hovered ? path : 'M0,0',
    stroke: hovered ? color : 'black',
    fill: hovered ? color : 'none',
  })

  return (
    <animated.svg
      viewBox={`0 0 ${diameter} ${diameter}`}
      width={diameter}
      height={diameter}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <animated.path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </animated.svg>
  )
}

export default Circle
