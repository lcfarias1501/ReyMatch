type themeTypes = 'Dark' | 'Light'

export interface Theme {
    selected: themeTypes
    opposite: themeTypes
    grey_background: string
    grey: string
    background: string
    on_background: string
    primary: string
    warning: string
    error: string
    success: string
}