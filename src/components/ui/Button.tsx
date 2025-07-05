"use client";
import * as React from "react";
import { cn } from "@/lib/utils";import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

export interface ButtonProps
  extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: "default" | "ghost";
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "default"
            ? "bg-white text-black hover:bg-gray-100 dark:bg-zinc-100 dark:text-black dark:hover:bg-white"
            : "bg-transparent border border-gray-500 text-white hover:bg-gray-800",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
