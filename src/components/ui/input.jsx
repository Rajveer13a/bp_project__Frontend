import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-9  rounded-[18px] border border-slate-500 bg-transparent  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-450 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-500 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 pl-[40px]",
        className
      )}
      ref={ref} 
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
