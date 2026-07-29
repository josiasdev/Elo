import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  badgeVariant?: 'yellow' | 'blue' | 'pink' | 'plum' | 'outline' | 'navy'
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  badgeVariant = 'yellow',
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 max-w-3xl',
        align === 'center' && 'mx-auto text-center items-center',
        className,
      )}
      {...props}
    >
      {label && (
        <div className="flex">
          <Badge variant={badgeVariant}>{label}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-elociv-navy leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
