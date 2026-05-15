import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(184,138,43,0.16),rgba(255,255,255,0.05))] bg-[length:700px_100%]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
