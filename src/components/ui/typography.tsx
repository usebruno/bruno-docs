import { cn } from "@site/src/lib/utils";
import React, {ReactNode} from "react";

interface TypoProps {
  titleClasses?: string;
  children: ReactNode;
}
export const TypoH1: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <h1 className={cn("tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl", titleClasses)}>
      {children}
    </h1>
  )
}

export const TypoH2: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <h2 className={cn("tw-scroll-m-20 tw-border-b tw-pb-1 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0", titleClasses)}>
      {children}
    </h2>
  )
}

export const TypoH3: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <h3 className={cn("tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight", titleClasses)}>
      {children}
    </h3>
  )
}

export const TypoH4: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <h4 className={cn("tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight", titleClasses)}>
      {children}
    </h4>
  )
}

export const TypoP: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <p className={cn("tw-leading-7 [&:not(:first-child)]:tw-mt-6", titleClasses)}>
      {children}
    </p>
  )
}

export const TypoLarge: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <div className={cn("tw-text-lg tw-font-semibold", titleClasses)}>{children}</div>
  )
}

export const TypoSmall: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <small className={cn("tw-text-sm tw-font-medium tw-leading-none", titleClasses)}>{children}</small>
  )
}

export const TypoMuted: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <p className={cn("tw-text-sm tw-text-muted-foreground", titleClasses)}>{children}</p>
  )
}

export const TypoLead: React.FC<TypoProps> = ({titleClasses, children}) => {
  return (
    <p className={cn("tw-text-xl tw-text-muted-foreground", titleClasses)}>
      {children}
    </p>
  )
}

interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant: "h1" | "h2" | "h3" | "h4" | "p" | "large" | "small" | "muted" | "lead";
}

export const Typography: React.FC<TypographyProps> = ({ children, variant, className = "" }) => {
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
}