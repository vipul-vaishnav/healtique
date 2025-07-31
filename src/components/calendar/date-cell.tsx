import React from 'react'

type DateCellProps = {
  isToday: boolean
  isSelected: boolean
  children: React.ReactNode
  handleDateClick: () => void
}

const DateCell: React.FC<DateCellProps> = (props) => {
  const { children, isToday, isSelected, handleDateClick } = props
  return (
    <button
      onClick={handleDateClick}
      className={`aspect-square border flex items-center justify-center hover:bg-border transition-all duration-300 ${
        isSelected && 'border-purple-600 text-white bg-chart-4 hover:bg-chart-4'
      } ${isToday && 'border-2 bg-border'}`}
    >
      {children}
    </button>
  )
}
export default DateCell
