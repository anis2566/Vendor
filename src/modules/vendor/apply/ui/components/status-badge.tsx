import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";

import { STORE_STATUS } from "@/constant";

interface StatusBadgeProps {
  status: STORE_STATUS;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  showIcon = true,
  className = "",
}) => {
  const getStatusConfig = (status: STORE_STATUS) => {
    switch (status) {
      case "Pending":
        return {
          bgColor: "bg-amber-100",
          textColor: "text-amber-800",
          borderColor: "border-amber-200",
          icon: <Clock className="shrink-0" />,
          animation: "animate-pulse",
        };
      case "Approved":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          icon: <CheckCircle className="shrink-0" />,
          animation: "",
        };
      case "Rejected":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          icon: <XCircle className="shrink-0" />,
          animation: "",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
          icon: null,
          animation: "",
        };
    }
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        font-medium ${sizeClasses[size]} ${config.bgColor} 
        ${config.textColor} ${config.borderColor} ${config.animation}
        transition-all duration-300 ease-in-out ${className}
      `}
    >
      {showIcon &&
        React.cloneElement(config.icon, { className: iconSizes[size] })}
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default StatusBadge;
