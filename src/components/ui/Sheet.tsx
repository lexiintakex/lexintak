"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = (props: SheetPrimitive.DialogPortalProps) => (
  <SheetPrimitive.Portal {...props} />
);

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "bottom" | "left" | "right";
  }
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-white p-6 shadow-lg transition ease-in-out duration-300",
        side === "top" && "inset-x-0 top-0 h-1/3",
        side === "bottom" && "inset-x-0 bottom-0 h-1/3",
        side === "left" && "inset-y-0 left-0 w-3/4 sm:w-64",
        side === "right" && "inset-y-0 right-0 w-3/4 sm:w-64",
        className
      )}
      {...props}
    >
      {children}
      <SheetClose className="absolute top-4 right-4 text-gray-600 hover:text-black">
        <X className="h-5 w-5" />
      </SheetClose>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetClose, SheetContent };
