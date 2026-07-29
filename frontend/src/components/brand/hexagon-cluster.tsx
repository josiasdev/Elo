import * as React from 'react'
import { cn } from '@/lib/utils'

export interface HexagonClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark'
}

export function HexagonCluster({
  variant = 'light',
  className,
  ...props
}: HexagonClusterProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className={cn('relative w-full h-full select-none pointer-events-none', className)}
      aria-hidden="true"
      {...props}
    >
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full object-contain overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Linhas pontilhadas e de conexão */}
        <line
          x1="80"
          y1="60"
          x2="220"
          y2="140"
          stroke={isDark ? 'rgba(255, 253, 247, 0.25)' : 'rgba(32, 40, 58, 0.2)'}
          strokeWidth="2"
          strokeDasharray="6,6"
        />
        <line
          x1="220"
          y1="140"
          x2="320"
          y2="80"
          stroke={isDark ? 'rgba(255, 253, 247, 0.25)' : 'rgba(32, 40, 58, 0.2)'}
          strokeWidth="2"
        />
        <line
          x1="220"
          y1="140"
          x2="260"
          y2="230"
          stroke={isDark ? 'rgba(255, 253, 247, 0.25)' : 'rgba(32, 40, 58, 0.2)'}
          strokeWidth="2"
          strokeDasharray="4,8"
        />

        {/* Hexágono Principal - Centro */}
        <g transform="translate(180, 90) scale(0.8)">
          <polygon
            points="50,4 90,26 90,74 50,96 10,74 10,26"
            fill="#8DD8F0"
            stroke="#20283A"
            strokeWidth="3"
          />
        </g>

        {/* Hexágono Secundário - Superior Esquerdo */}
        <g transform="translate(40, 20) scale(0.65)">
          <polygon
            points="50,4 90,26 90,74 50,96 10,74 10,26"
            fill="#F4DC67"
            stroke="#20283A"
            strokeWidth="3"
          />
        </g>

        {/* Hexágono - Superior Direito */}
        <g transform="translate(280, 40) scale(0.6)">
          <polygon
            points="50,4 90,26 90,74 50,96 10,74 10,26"
            fill="#EDA9C2"
            stroke="#20283A"
            strokeWidth="3"
          />
        </g>

        {/* Hexágono - Inferior Direito */}
        <g transform="translate(220, 190) scale(0.55)">
          <polygon
            points="50,4 90,26 90,74 50,96 10,74 10,26"
            fill="#69475F"
            opacity="0.85"
          />
        </g>

        {/* Círculos vazados e pontos (grafismos) */}
        <circle
          cx="130"
          cy="200"
          r="16"
          fill="none"
          stroke={isDark ? '#F4DC67' : '#20283A'}
          strokeWidth="3"
        />
        <circle cx="90" cy="150" r="5" fill="#EDA9C2" />
        <circle cx="280" cy="180" r="6" fill="#F4DC67" />
        <circle cx="340" cy="140" r="4" fill="#8DD8F0" />
        <circle cx="160" cy="60" r="5" fill="#20283A" />
      </svg>
    </div>
  )
}
