import React from 'react'

type CalendarWeeksProps = {
  days: string[]
}

const CalendarWeeks: React.FC<CalendarWeeksProps> = (props) => {
  const { days } = props
  return (
    <div className="col-span-7 grid grid-cols-7 w-full">
      {days.map((day) => {
        return (
          <div key={day} className="aspect-square grid place-content-center">
            <h2 className="font-bold text-muted-foreground">{day}</h2>
          </div>
        )
      })}
    </div>
  )
}
export default CalendarWeeks
