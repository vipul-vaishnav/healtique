import React from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { add, sub, format } from 'date-fns'

type CalendarHeaderProps = {
  viewDate: Date
  setViewDate: React.Dispatch<React.SetStateAction<Date>>
}

type JumpType = 'next_month' | 'next_year' | 'prev_month' | 'prev_year'

const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const { viewDate, setViewDate } = props

  const title = format(viewDate, 'MMMM yyyy')

  const jump = (type: JumpType) => {
    let newDate: Date = viewDate
    switch (type) {
      case 'next_month':
        newDate = add(newDate, { months: 1 })
        break
      case 'next_year':
        newDate = add(newDate, { years: 1 })
        break
      case 'prev_month':
        newDate = sub(newDate, { months: 1 })
        break
      case 'prev_year':
        newDate = sub(newDate, { years: 1 })
        break
      default:
        newDate = newDate
    }

    setViewDate(newDate)
  }

  return (
    <div className="col-span-7 grid grid-cols-7 items-center gap-1 w-full">
      <Button onClick={() => jump('prev_year')} variant={'secondary'}>
        <ChevronsLeft />
      </Button>
      <Button onClick={() => jump('prev_month')} variant={'secondary'}>
        <ChevronLeft />
      </Button>

      <p className="col-span-3 text-center font-bold">{title}</p>

      <Button onClick={() => jump('next_month')} variant={'secondary'}>
        <ChevronRight />
      </Button>
      <Button onClick={() => jump('next_year')} variant={'secondary'}>
        <ChevronsRight />
      </Button>
    </div>
  )
}
export default CalendarHeader
