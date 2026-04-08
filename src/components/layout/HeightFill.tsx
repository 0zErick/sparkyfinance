import React from 'react';
import { cn } from '@/lib/utils';

/**
 * HeightFill component for consistent full-height layouts
 * Replaces style={{ height: '100svh' }} and similar patterns
 */
export interface HeightFillProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'screen' | 'viewport' | 'dvh' | 'svh';
  minHeight?: boolean;
  maxHeight?: boolean;
}

export const HeightFill: React.FC<HeightFillProps> = ({
  children,
  className,
  variant = 'screen',
  minHeight = true,
  maxHeight = true,
}) => {
  const heightClass = {
    screen: 'h-screen',
    viewport: 'h-[100vh]',
    dvh: 'h-[100dvh]',
    svh: 'h-[100svh]',
  }[variant];

  return (
    <div
      className={cn(
        // Base height
        heightClass,
        // Optional constraints
        minHeight && `min-${heightClass.replace('h-', '')}`,
        maxHeight && `max-${heightClass.replace('h-', '')}`,
        // Prevent overflow issues
        'overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

HeightFill.displayName = 'HeightFill';
