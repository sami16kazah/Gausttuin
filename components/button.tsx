import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/util/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  link?: string;
  isIcon?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  link,
  isIcon,
  className,
  ...rest
}) => {
  return link ? (
    <Link href={link} target="_blank" className="w-full cursor-pointer">
      <button
        className={cn(
          "flex items-center justify-center gap-2 bg-green-700 rounded-full select-none text-white text-sm font-medium hover:bg-orange-400",
          "transition-colors duration-100",
          className,
          isIcon ? "h-10 w-10" : "w-full h-auto px-5 py-3"
        )}
        {...rest}
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      className={cn(
        "flex items-center justify-center gap-2 bg-green-700 rounded-full select-none text-white text-sm font-medium hover:bg-orange-400",
        "transition-colors duration-100",
        className,
        isIcon ? "h-10 w-10" : "w-full h-auto px-5 py-3"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
