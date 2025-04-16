// src/components/ui/scroll-area.tsx
'use client';

import * as React from 'react';
import { ScrollArea as BaseScrollArea, ScrollBar } from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <div className="h-full w-full overflow-auto pr-4">
      {children}
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </div>
  </BaseScrollArea>
));
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
