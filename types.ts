import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface CalculatorRoute {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'math' | 'finance' | 'health' | 'developer' | 'advanced';
  path: string;
  icon?: LucideIcon;
  component: React.ReactNode;
  keywords: string[];
}

export type Theme = 'light' | 'dark';

export interface UnitCategory {
  name: string;
  units: { [key: string]: number }; // Conversion factor relative to a base unit
}

export interface Matrix2x2 {
  a: number; b: number;
  c: number; d: number;
}