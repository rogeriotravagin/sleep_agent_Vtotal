
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-sans",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
        success:
          "border-transparent bg-success/10 text-success hover:bg-success/20",
        warning:
          "border-transparent bg-warning/10 text-warning hover:bg-warning/20",
        info:
          "border-transparent bg-info/10 text-info hover:bg-info/20",
        outline: "text-muted-foreground border-border bg-transparent hover:text-foreground",
        active:
          "border-transparent bg-brand-green text-white hover:bg-brand-green/80",
        inactive:
          "border-transparent bg-muted text-muted-foreground opacity-70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
