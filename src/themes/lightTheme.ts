import { Theme } from "../interfaces/Theme"

export const lightTheme: Theme = {
    selected: 'Light',
    opposite: 'Dark',
    grey_background: '#F5F5F7',  // Very light grey for subtle backgrounds
    grey: '#E1E1E3',            // Light grey for borders and inactive elements
    background: '#FFFFFF',       // Pure white background
    on_background: '#1A1A1A',    // Near-black for text
    primary: '#5B21B6',         // Deep purple (same as dark theme)
    warning: '#F59E0B',         // Warm amber
    error: '#EF4444',           // Bright red
    success: '#10B981',         // Emerald green
}