"use client";

import Link from "next/link";

interface StarLogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function StarLogo({ variant = "dark", size = "md", showText = true }: StarLogoProps) {
  const sizes = {
    sm: { icon: 16, text: "text-xs", gap: "gap-1.5" },
    md: { icon: 20, text: "text-sm", gap: "gap-2" },
    lg: { icon: 24, text: "text-base", gap: "gap-2" },
  };

  const { icon, text, gap } = sizes[size];
  const textColor = variant === "dark" ? "text-white" : "text-black";

  return (
    <Link 
      href="/chat" 
      className={`flex items-center ${gap} hover:opacity-80 transition-opacity cursor-pointer`}
    >
      {/* Diamond Icon */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diamond shape with faceted effect */}
        <defs>
          <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE566" />
            <stop offset="50%" stopColor="#FFD400" />
            <stop offset="100%" stopColor="#E6B800" />
          </linearGradient>
          <linearGradient id="diamondShine" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFF5CC" />
            <stop offset="100%" stopColor="#FFD400" />
          </linearGradient>
        </defs>
        
        {/* Main diamond body */}
        <path
          d="M12 2L22 12L12 22L2 12L12 2Z"
          fill="url(#diamondGradient)"
        />
        
        {/* Top-left facet (lighter) */}
        <path
          d="M12 2L2 12L12 12L12 2Z"
          fill="url(#diamondShine)"
          opacity="0.7"
        />
        
        {/* Bottom-right facet (darker) */}
        <path
          d="M12 12L22 12L12 22L12 12Z"
          fill="#E6B800"
          opacity="0.5"
        />
        
        {/* Center highlight */}
        <path
          d="M12 6L16 12L12 18L8 12L12 6Z"
          fill="#FFF5CC"
          opacity="0.3"
        />
      </svg>

      {/* Text */}
      {showText && (
        <span className={`font-bold tracking-[-0.5px] ${text} ${textColor}`}>
          STAR
        </span>
      )}
    </Link>
  );
}
