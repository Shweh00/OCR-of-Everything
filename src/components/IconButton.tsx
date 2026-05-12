import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  variant?: "ghost" | "soft" | "primary";
}

export function IconButton({ icon, label, variant = "ghost", className = "", ...props }: IconButtonProps) {
  return (
    <button
      className={`icon-button icon-button--${variant} ${className}`}
      type="button"
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  );
}
