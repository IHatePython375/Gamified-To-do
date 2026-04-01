export const lightTheme = {
  '--text': '#6b6375',
  '--text-h': '#08060d',
  '--bg': '#dadada',
  '--border': '#e5e4e7',
  '--code-bg': '#f4f3ec',
  '--accent': '#044527',
  '--accent-bg': 'rgba(170, 59, 255, 0.1)',
  '--accent-border': 'rgba(46, 140, 82, 0.5)',
  '--social-bg': 'rgba(244, 243, 236, 0.5)',
  '--shadow': 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
  '--widget-color': 'rgba(167, 167, 167, 0.6)',
  '--button-bg': '#aeaeae',
  '--dropdownButtonArrow': 'black',
  '--widgetBackground': '#888',
  '--xpWidgetBg': '#666'
}

export const darkTheme = {
  '--text': '#9ca3af',
  '--text-h': '#f3f4f6',
  '--bg': '#16171d',
  '--border': '#2e303a',
  '--code-bg': '#1f2028',
  '--accent': '#079653',
  '--accent-bg': 'rgba(132, 252, 192, 0.15)',
  '--accent-border': 'rgba(73, 221, 129, 0.5)',
  '--social-bg': 'rgba(47, 48, 58, 0.5)',
  '--shadow': 'rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px',
  '--widget-color': 'rgba(0, 0, 0, 0.6)',
  '--button-bg': '#222',
  '--dropdownButtonArrow': 'white',
  '--widgetBackground': '#222',
  '--xpWidgetBg': '#222'
}

export function applyTheme(theme) {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(key, value)
    })
}