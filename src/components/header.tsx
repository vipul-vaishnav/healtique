import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { format } from 'date-fns'

type HeaderProps = {
  date: Date
}

const Header: React.FC<HeaderProps> = (props) => {
  const { date } = props

  return (
    <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b-2 px-6">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-2xl">
          <span>Heal</span>
          <span className="text-[#7950f2]">Tique.</span>
        </h1>
        <p className="font-semibold text-sm">{format(date, 'MMMM dd, yyyy')}</p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-sm font-semibold">Dr. Bruce Banner</h6>
            <p className="text-xs text-muted-foreground">hulk@shieldhq.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
