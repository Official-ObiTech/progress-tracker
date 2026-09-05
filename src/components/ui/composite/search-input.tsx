'use client';

import * as React from 'react';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from '../primitives/icon';
import { Input, type InputProps } from '../primitives/input';

export interface SearchInputProps extends InputProps {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ size = 'md', className, ...props }, ref) {
    return (
      <div className="relative">
        <Icon
          icon={Search}
          size="md"
          className="text-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <Input
          ref={ref}
          type="search"
          size={size}
          className={cn('pl-9', className)}
          {...props}
        />
      </div>
    );
  },
);
