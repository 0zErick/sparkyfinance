import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Responsive container component that handles full-screen layouts
 * with proper viewport height and safe area support
 */
export interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
  excludeSafeArea?: boolean;
  overflow?: 'hidden' | 'auto' | 'visible';
  overscrollBehavior?: 'none' | 'contain' | 'auto';
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  fullScreen = false,
  excludeSafeArea = false,
  overflow = 'hidden',
  overscrollBehavior = 'none',
}) => {
  return (
    <div
      className={cn(
        // Base styles
        'relative w-full',
        // Full-screen handling
        fullScreen && 'h-screen min-h-screen max-h-screen',
        // Overflow and scroll behavior
        overflow === 'hidden' && 'overflow-hidden',
        overflow === 'auto' && 'overflow-auto',
        overflow === 'visible' && 'overflow-visible',
        overscrollBehavior === 'none' && 'overscroll-contain',
        // Safe area handling (iPhone notch)
        !excludeSafeArea && [
          'pt-[env(safe-area-inset-top,0px)]',
          'pb-[env(safe-area-inset-bottom,0px)]',
          'pl-[env(safe-area-inset-left,0px)]',
          'pr-[env(safe-area-inset-right,0px)]',
        ],
        className
      )}
    >
      {children}
    </div>
  );
};

ResponsiveContainer.displayName = 'ResponsiveContainer';
