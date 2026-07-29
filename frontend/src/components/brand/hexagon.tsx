import * as React from 'react'
import { cn } from '@/lib/utils'

export interface HexagonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'yellow' | 'pink' | 'blue' | 'navy' | 'plum' | 'outline-navy' | 'outline-ivory'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Hexagon({
  variant = 'yellow',
  size = 'md',
  className,
  ...props
}: HexagonProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0 aspect-square',
        size === 'sm' && 'h-6 w-6',
        size === 'md' && 'h-10 w-10',
        size === 'lg' && 'h-16 w-16',
        size === 'xl' && 'h-24 w-24',
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,4 90,26 90,74 50,96 10,74 10,26"
          className={cn(
            variant === 'yellow' && 'fill-elociv-yellow',
            variant === 'pink' && 'fill-elociv-pink',
            variant === 'blue' && 'fill-elociv-blue',
            variant === 'navy' && 'fill-elociv-navy',
            variant === 'plum' && 'fill-elociv-plum',
            variant === 'outline-navy' && 'fill-none stroke-elociv-navy stroke-[6]',
            variant === 'outline-ivory' && 'fill-none stroke-elociv-ivory stroke-[6]',
          )}
        />
      </svg>
    </div>
  )
}
