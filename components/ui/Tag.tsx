import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li
      className={cn("rounded-full border border-steel/50 px-3 py-1.5 label text-steel", className)}
    >
      {children}
    </li>
  );
}
