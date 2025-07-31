import { useEffect, useLayoutEffect, useState } from 'react'

const LOCALSTORAGE_KEY = 'healtique_theme_key'

type UseThemeReturnType = {
  theme?: 'dark' | 'light'
  toggle: () => void
}

type Theme = UseThemeReturnType['theme']

// const getInitialTheme = (): Theme => {
//   if (typeof window !== 'undefined') {
//     const storedTheme = localStorage.getItem(LOCALSTORAGE_KEY)
//     if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
//     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
//   } else return 'light'
// }

export const useTheme = (): UseThemeReturnType => {
  const [theme, setTheme] = useState<Theme>()

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem(LOCALSTORAGE_KEY) as Theme | null

    const preferredTheme: Theme =
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

    setTheme(preferredTheme)
    document.documentElement.classList.toggle('dark', preferredTheme === 'dark')
  }, [])

  const toggle = (): void => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(LOCALSTORAGE_KEY, next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return {
    theme,
    toggle
  }
}
