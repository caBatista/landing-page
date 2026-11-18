import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn("rounded-full border border-current/20 px-3 py-1.5 label", className)}>
      {children}
    </li>
  );
}
