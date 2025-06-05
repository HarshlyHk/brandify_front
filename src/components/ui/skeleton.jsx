import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      data-slot="skeleton"
      className={cn("bg-[#d2d2d2] animate-pulse ", className)}
      {...props} />)
  );
}

export { Skeleton }
