import { Loader2, LucideIcon } from "lucide-react";

import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

interface Props {
  isLoading: boolean;
  title: string;
  loadingTitle: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  icon?: LucideIcon;
  disabled?: boolean;
}

export const LoadingButton = ({
  isLoading,
  title,
  loadingTitle,
  onClick,
  type = "button",
  className,
  variant = "default",
  icon: Icon,
  disabled = false,
}: Props) => {
  return (
    <Button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn("flex items-center gap-x-2 rounded-none", className)}
      type={type}
      variant={variant}
    >
      {!isLoading && Icon && <Icon className="h-4 w-4" />}
      {isLoading && <Loader2 className="h-4 animate-spin w-4" />}
      {isLoading && !disabled ? loadingTitle : title}
    </Button>
  );
};
