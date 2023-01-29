import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:hover:bg-primary-800 dark:hover:text-primary-100 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-primary-100 dark:data-[state=open]:bg-primary-800",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600 dark:text-white",
        outline:
          "bg-transparent border border-primary-200 hover:bg-primary-100 dark:border-primary-700 dark:text-primary-100",
        subtle:
          "bg-primary-100 text-primary-900 hover:bg-primary-200 dark:bg-primary-700 dark:text-primary-100",
        ghost:
          "bg-transparent hover:bg-primary-100 dark:hover:bg-primary-800 dark:text-primary-100 dark:hover:text-primary-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-primary-900 dark:text-primary-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
