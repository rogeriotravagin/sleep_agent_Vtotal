
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-border bg-transparent hover:bg-muted text-foreground transition-colors",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted text-muted-foreground hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline lowercase tracking-normal font-medium text-sm",
        glowing: "bg-black text-white border border-primary/30 shadow-[0_0_20px_rgba(201,178,152,0.15)] hover:shadow-[0_0_30px_rgba(201,178,152,0.3)] transition-shadow duration-500",
        // Added success and warning variants as they are used in the codebase
        success: "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/10",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg shadow-yellow-500/10",
      },
      size: {
        default: "h-14 px-8 py-2",
        sm: "h-10 px-6",
        lg: "h-16 px-12 text-xs",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Explicitly define properties to avoid inference issues in this environment
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glowing" | "success" | "warning" | null
  size?: "default" | "sm" | "lg" | "icon" | null
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        // Use type casting to ensure buttonVariants accepts the explicit strings from ButtonProps
        className={cn(buttonVariants({ variant: variant as any, size: size as any, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
