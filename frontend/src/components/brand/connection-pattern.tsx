import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ConnectionPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'lines' | 'combined'
  align?: 'left' | 'right' | 'center'
}

export function ConnectionPattern({
  variant = 'combined',
  align = 'right',
  className,
  ...props
}: ConnectionPatternProps) {
  return (
    <div
      className={cn(
        'absolute pointer-events-none aria-hidden-true select-none z-0 overflow-hidden opacity-80',
        align === 'left' ? 'left-0 top-1/4 -translate-x-1/4' : align === 'right' ? 'right-0 top-1/3 translate-x-1/4' : 'inset-x-0 mx-auto top-1/2 -translate-y-1/2',
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-elociv-navy/15"
      >
        {(variant === 'lines' || variant === 'combined') && (
          <>
            <path
              d="M20 120 C 60 80, 120 160, 180 120"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <path
              d="M60 40 C 120 40, 160 100, 200 180"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </>
        )}
        {(variant === 'dots' || variant === 'combined') && (
          <>
            <circle cx="20" cy="120" r="6" fill="#F4DC67" />
            <circle cx="180" cy="120" r="8" fill="#EDA9C2" />
            <circle cx="60" cy="40" r="5" fill="#8DD8F0" />
            <circle cx="200" cy="180" r="7" fill="#69475F" />
            <circle
              cx="120"
              cy="120"
              r="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  )
}
