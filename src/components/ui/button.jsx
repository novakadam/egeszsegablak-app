import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#3D3935] text-[#F5F3F0] hover:bg-[#6B6560]",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90",
        outline:
          "border border-[#D4CFC7] bg-transparent hover:bg-[#E8E5E0] hover:text-[#3D3935]",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-slate-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2 text-base",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, style, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const defaultStyle = { borderRadius: '8px 8px 24px 24px' };
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      style={{ ...defaultStyle, ...style }}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }