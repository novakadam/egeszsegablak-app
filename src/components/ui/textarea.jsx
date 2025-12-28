
import React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-[#D4CFC7] bg-transparent px-4 py-2 text-base ring-offset-white placeholder:text-[#8B8580] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D3935] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
