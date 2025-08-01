import React from 'react'
import { TimeSlot } from './slots-view'

type SlotTimeProps = {
  slot: TimeSlot
}

const getLabel = (startTime: number): string => {
  const hours = Math.floor(startTime / 60)
  const minutes = startTime % 60
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 === 0 ? 12 : hours % 12
  const paddedMinutes = minutes.toString().padStart(2, '0')
  return `${displayHour}:${paddedMinutes} ${period}`
}

const SlotTime: React.FC<SlotTimeProps> = ({ slot }) => {
  const label = getLabel(slot.startTime)
  const subLabel = `${label} - ${getLabel(slot.endTime)}`
  return (
    <div className="h-24 p-4 w-36 border-b border-r">
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-[10px] mt-1 font-light text-muted-foreground">{subLabel}</p>
    </div>
  )
}
export default SlotTime
