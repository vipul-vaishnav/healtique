import React, { useState } from 'react'
import { Booking } from './slots-view'
import CustomAvatar from '../custom-avatar'
import { SlotDeleteDialog } from './slot-delete-dialog'

type SlotBookedProps = {
  slot: {
    type: 'booked' | 'empty'
    booking?: Booking
    span: number
    startTime: number
  }
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

const bg = (booking: Booking) =>
  booking.type === 'onboarding'
    ? 'bg-[#D8DBFF] dark:bg-[#394069]/80'
    : 'bg-[#EAFDEE] dark:bg-[#266030]/80'

const border = (booking: Booking) =>
  booking.type === 'onboarding' ? 'border-l-5 border-l-[#5C6CC6]' : 'border-l-5 border-l-[#44B259]'

const SlotBooked: React.FC<SlotBookedProps> = (props) => {
  const { slot, setBookings } = props
  const bookingBg = bg(slot.booking!)
  const bookingBorder = border(slot.booking!)
  const [open, setOpen] = useState(false)

  if (slot.type !== 'booked' || !slot.booking) {
    return null
  }

  return (
    <div
      className={`border-l-5 border-b ${bookingBg} ${bookingBorder} dark:backdrop-blur-3xl text-sm font-normal p-2`}
      style={{ height: `${slot.span * 7}rem` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CustomAvatar
            fullName={slot.booking?.client.fullName ?? ''}
            phoneNumber={slot.booking?.client.phoneNumber ?? ''}
          />
          <p className="font-semibold">{slot.booking?.client.fullName}</p>
        </div>
        <SlotDeleteDialog
          open={open}
          setOpen={setOpen}
          id={slot.booking?.id ?? ''}
          setBookings={setBookings}
        />
      </div>
      <div className="mt-1 space-y-1">
        <p className="text-sm font-medium">{slot.booking!.title}</p>
        <p className="text-xs text-muted-foreground">{slot.booking?.note}</p>
      </div>
    </div>
  )
}
export default SlotBooked
