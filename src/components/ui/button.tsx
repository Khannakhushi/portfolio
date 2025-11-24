import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:shadow-orange-500/25 relative overflow-hidden group",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background/50 backdrop-blur-sm shadow-sm hover:border-orange-500/50 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-tr from-amber-500 to-rose-600 text-white shadow-lg hover:shadow-orange-500/25 border-none",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-14 rounded-full px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  asMotion?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, asMotion = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : (asMotion ? motion.button : "button")
    
    const motionProps = asMotion && !asChild ? {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    } : {}

    return (
      // @ts-ignore - framer-motion types are tricky with polymorphic components
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...motionProps}
        {...props}
      >
        {variant === 'default' && (
           <div className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
