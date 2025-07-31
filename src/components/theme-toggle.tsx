'use client'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'
import { Switch } from './ui/switch'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Sun size={20} />
      <Switch className="cursor-pointer" checked={theme === 'dark'} onCheckedChange={toggle} />
      <Moon size={20} />
    </div>
  )
}
