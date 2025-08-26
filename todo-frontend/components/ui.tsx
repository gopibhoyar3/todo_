"use client";

import { HTMLAttributes } from "react";


export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "w-full rounded-xl px-4 py-3 bg-sky-700 hover:bg-sky-600",
        "text-white font-medium transition border border-white/10",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]",
        className
      )}
    />
  );
}

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex min-w-5 items-center justify-center",
        "rounded-full border border-white/10 bg-white/5",
        "px-2 py-0.5 text-xs text-white/80",
        className
      )}
    />
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <div className={cn("h-px w-full bg-white/10", className)} />;
}

function cn(...a: (string | undefined | false)[]) {
  return a.filter(Boolean).join(" ");
}

export function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={["inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition px-2.5 py-2", className].join(" ")}
    />
  );
}

