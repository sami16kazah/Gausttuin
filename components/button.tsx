import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { cn } from "@/util/cn";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  link?: string;
  isIcon?: boolean;
  className?: string;
  type?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  link,
  isIcon,
  className,
  ...rest
}) => {
  return (
    <>
      {link ? (
        <Link href={link} target="_blank" className="w-full cursor-pointer">
          <ButtonBody {...rest} className={className} isIcon={isIcon}>
            {children}
          </ButtonBody>
        </Link>
      ) : (
        <ButtonBody {...rest} className={className} isIcon={isIcon}>
          {children}
        </ButtonBody>
      )}
    </>
  );
};

interface ButtonBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isIcon?: boolean;
  className?: string;
}

const ButtonBody: FC<ButtonBodyProps> = ({
  children,
  isIcon,
  className,
  ...rest
}) => {
  return (
    <div className="cursor-pointer flex-none w-full h-full">
      <div
        {...rest}
        className={cn(
          "flex items-center justify-center gap-2 bg-green-700 rounded-full select-none text-white text-sm font-medium hover:bg-green-800",
          "transition-colors duration-100",
          className,
          isIcon ? "h-10 w-10" : "w-full h-auto px-5 py-3" // Adjusted to ensure w-full works
        )}
      >
        {children}
      </div>
    </div>
  );
};
