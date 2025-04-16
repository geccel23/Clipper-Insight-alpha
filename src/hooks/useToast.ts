'use client'

import { useContext } from 'react';
import { toast as sonner } from 'sonner';

export function useToast() {
  const toast = sonner;
  return { toast };
}
