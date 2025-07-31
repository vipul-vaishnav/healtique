import React, { useMemo, useState } from 'react'
import DateCell from './date-cell'
import CalendarWeeks from './calendar-weeks'
import CalendarHeader from './calendar-header'
import { endOfMonth, getDaysInMonth, startOfMonth, setDate, format } from 'date-fns'
import { createId } from '@paralleldrive/cuid2'
import { toast } from 'sonner'
import { Calendar1Icon } from 'lucide-react'

type CalendarProps = {
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// **Date.getDay() gives day 0 for sun and 2 for tuesday

const Calendar: React.FC<CalendarProps> = (props) => {
  const { selectedDate, setSelectedDate } = props
  const [viewDate, setViewDate] = useState(selectedDate)

  const startOfMonthValue = startOfMonth(viewDate)
  const preDays = startOfMonthValue.getDay()

  const numberOfDays = getDaysInMonth(viewDate)

  const endOfMonthValue = endOfMonth(viewDate)
  const postDays = DAYS.length - 1 - endOfMonthValue.getDay() // not required but for consistency

  //   const viewDay = viewDate.getDate()
  const viewMonth = viewDate.getMonth() // starts from 0, 0 -> Jan,  1 -> Feb
  const viewYear = viewDate.getFullYear()

  const selectedDay = selectedDate.getDate()
  const selectedMonth = selectedDate.getMonth()
  const selectedYear = selectedDate.getFullYear()

  const today = useMemo(() => new Date(), [])
  const presentDay = today.getDate()
  const presentMonth = today.getMonth()
  const presentYear = today.getFullYear()

  const currViewIsPresentView = viewMonth === presentMonth && viewYear === presentYear
  const currViewIsSelectedView = viewMonth === selectedMonth && viewYear === selectedYear

  const handleDateClick = (x: number) => {
    const newDate = setDate(viewDate, x)
    setSelectedDate(newDate)
    toast.success('Date changed to ' + format(newDate, 'dd, MMMM, yyyy'), {
      icon: <Calendar1Icon />
    })
  }

  return (
    <div className="grid grid-cols-7">
      <CalendarHeader viewDate={viewDate} setViewDate={setViewDate} />
      <CalendarWeeks days={DAYS} />
      {Array.from({ length: preDays }).map(() => (
        <div key={createId()}>&nbsp;</div>
      ))}
      {Array.from({ length: numberOfDays }).map((_, idx) => {
        const date = idx + 1
        const isToday = currViewIsPresentView && presentDay === date
        const isSelected = currViewIsSelectedView && date === selectedDay
        return (
          <DateCell
            handleDateClick={() => handleDateClick(date)}
            isSelected={isSelected}
            isToday={isToday}
            key={createId()}
          >
            {date}
          </DateCell>
        )
      })}
      {Array.from({ length: postDays }).map(() => (
        <div key={createId()}>&nbsp;</div>
      ))}
    </div>
  )
}
export default Calendar
