import { 
  Calculator, Percent, DollarSign, Activity, Code, 
  Binary, FileDigit, Divide, Box, Calendar, Grid 
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'basic', name: 'Basic & Everyday', icon: Calculator },
  { id: 'finance', name: 'Finance', icon: DollarSign },
  { id: 'math', name: 'Mathematics', icon: Divide },
  { id: 'health', name: 'Health & Fitness', icon: Activity },
  { id: 'developer', name: 'Developer Tools', icon: Code },
];

export const UNIT_CONVERSIONS: Record<string, any> = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    inches: 39.3701,
    feet: 3.28084,
    yards: 1.09361,
    miles: 0.000621371,
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    milligrams: 1000000,
    pounds: 2.20462,
    ounces: 35.274,
    stones: 0.157473,
  },
  temperature: {
    celsius: 1,
    fahrenheit: 1,
    kelvin: 1,
  },
  volume: {
    liters: 1,
    milliliters: 1000,
    cubic_meters: 0.001,
    gallons_us: 0.264172,
    quarts_us: 1.05669,
    pints_us: 2.11338,
    cups: 4.22675,
    fluid_ounces: 33.814
  },
  area: {
    square_meters: 1,
    square_kilometers: 0.000001,
    square_feet: 10.7639,
    square_miles: 3.861e-7,
    acres: 0.000247105,
    hectares: 0.0001
  }
};