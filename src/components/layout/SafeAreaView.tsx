import React from 'react';
import { cn } from '@/lib/utils';

/**
 * SafeAreaView component for iOS notch handling
 * Automatically adds safe area padding based on device
 */
export interface SafeAreaViewProps {
  children: React.ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  className,
  top = true,
  bottom = true,
  left = false,
  right = false,
}) => {
  return (
    <div
      className={cn(
        // Safe area padding
        top && 'pt-[env(safe-area-inset-top,0px)]',
        bottom && 'pb-[env(safe-area-inset-bottom,0px)]',
        left && 'pl-[env(safe-area-inset-left,0px)]',
        right && 'pr-[env(safe-area-inset-right,0px)]',
        className
      )}
    >
      {children}
    </div>
  );
};

SafeAreaView.displayName = 'SafeAreaView';
