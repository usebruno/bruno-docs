import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface TypoProps {
  titleClasses?: string;
  children: ReactNode;
}
export const TypoH1: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl",
        titleClasses,
      )}
    >
      {children}
    </h1>
  );
};

export const TypoH2: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-1 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0",
        titleClasses,
      )}
    >
      {children}
    </h2>
  );
};

export const TypoH3: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight",
        titleClasses,
      )}
    >
      {children}
    </h3>
  );
};

export const TypoH4: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight",
        titleClasses,
      )}
    >
      {children}
    </h4>
  );
};

export const TypoP: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", titleClasses)}>
      {children}
    </p>
  );
};

export const TypoLarge: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <div className={cn("text-base sm:text-lg font-semibold", titleClasses)}>
      {children}
    </div>
  );
};

export const TypoSmall: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <small className={cn("text-sm font-medium leading-none", titleClasses)}>
      {children}
    </small>
  );
};

export const TypoMuted: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", titleClasses)}>
      {children}
    </p>
  );
};

export const TypoLead: React.FC<TypoProps> = ({ titleClasses, children }) => {
  return (
    <p className={cn("text-lg sm:text-xl text-muted-foreground", titleClasses)}>
      {children}
    </p>
  );
};

interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "large"
    | "small"
    | "muted"
    | "lead";
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className = "",
}) => {
  const Component = {
    h1: TypoH1,
    h2: TypoH2,
    h3: TypoH3,
    h4: TypoH4,
    p: TypoP,
    large: TypoLarge,
    small: TypoSmall,
    muted: TypoMuted,
    lead: TypoLead,
  }[variant];
  return <Component titleClasses={className}>{children}</Component>;
};
