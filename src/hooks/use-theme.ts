import { useEffect, useState } from 'react'

const LOCALSTORAGE_KEY = 'healtique_theme_key'

type UseThemeReturnType = {
  theme: 'dark' | 'light'
  toggle: () => void
}

type Theme = UseThemeReturnType['theme']

const getInitialTheme = (): Theme => {
  if (typeof window === undefined) return 'light'
  const storedTheme = localStorage.getItem(LOCALSTORAGE_KEY)
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useTheme = (): UseThemeReturnType => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

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
