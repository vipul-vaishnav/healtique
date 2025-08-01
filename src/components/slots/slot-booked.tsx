import React from 'react'
import { Booking } from './slots-view'

type SlotBookedProps = {
  slot: {
    type: 'booked' | 'empty'
    booking?: Booking
    span: number
  }
}

const bg = (booking: Booking) =>
  booking.type === 'onboarding'
    ? 'bg-[#D8DBFF] dark:bg-[#394069]/80'
    : 'bg-[#EAFDEE] dark:bg-[#266030]/80'

const border = (booking: Booking) =>
  booking.type === 'onboarding' ? 'border-l-5 border-l-[#5C6CC6]' : 'border-l-5 border-l-[#44B259]'

const SlotBooked: React.FC<SlotBookedProps> = (props) => {
  const { slot } = props
  const bookingBg = bg(slot.booking!)
  const bookingBorder = border(slot.booking!)

  return (
    <div
      className={`h-24 border-l-5 border-b ${bookingBg} ${bookingBorder} dark:backdrop-blur-3xl text-sm font-normal p-2`}
      style={{ height: `${slot.span * 6}rem` }}
    >
      <p className="text-sm font-semibold">
        {slot.booking!.emoji} {slot.booking!.clientName}
      </p>
      <p className="text-xs">{slot.booking!.label}</p>
    </div>
  )
}
export default SlotBooked
