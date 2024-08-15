import { cn } from "~/utils";

export function AppConainer({
  className,
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "absolute left-[50%] top-[50%] mx-auto w-full max-w-7xl -translate-x-[50%] -translate-y-[50%]",
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col rounded-md bg-surface-secondary p-6 shadow-lg">
        {children}
      </div>
    </main>
  );
}
