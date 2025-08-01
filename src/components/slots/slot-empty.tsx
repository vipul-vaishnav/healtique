import React from 'react'
import { toast } from 'sonner'

type SlotEmptyProps = {
  handleAvailableSlotClick: () => void
  startTime: number
  selectedDate: Date
}

const SlotEmpty: React.FC<SlotEmptyProps> = ({
  handleAvailableSlotClick,
  selectedDate,
  startTime
}) => {
  const now = new Date()
  const currDate = now.toDateString()
  const selectedDateString = selectedDate.toDateString()
  const currentTimeInMins = now.getHours() * 60 + now.getMinutes()

  const isExpiredSlot =
    // 1. If selected date is before today
    selectedDate < new Date(currDate) ||
    // 2. If selected date is today AND slot time is in the past
    (selectedDateString === currDate && startTime < currentTimeInMins)

  return (
    <button
      onClick={() => {
        if (isExpiredSlot) {
          toast.error('Slot is Expired', {
            style: { backgroundColor: '#f03e3e', color: 'white' }
          })
        } else {
          handleAvailableSlotClick()
        }
      }}
      className={`h-24 border-b w-full flex items-center justify-center text-sm font-semibold text-muted-foreground relative`}
    >
      {isExpiredSlot && (
        <div className="absolute grid grid-cols-9 bg-transparent w-full h-32">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={`${idx}-expire-line`}
              className="w-[1px] h-full bg-muted rotate-45 translate-x-12"
            />
          ))}
        </div>
      )}
      <div className="z-[50]">{isExpiredSlot && 'Expired'}</div>
    </button>
  )
}
export default SlotEmpty
