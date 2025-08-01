import { createId } from '@paralleldrive/cuid2'
import React, { useEffect, useState } from 'react'
import SlotBooked from './slot-booked'
import SlotEmpty from './slot-empty'
import SlotTime from './slot-time'
import SlotBookingDialog from './slot-booking-dialog'

type SlotsViewProps = {
  selectedDate: Date
}

export type TimeSlot = {
  startTime: number // in minutes from midnight (00:00 AM)
  endTime: number
}

export type Booking = {
  type: 'onboarding' | 'followup'
  startTime: number // minutes from midnight
  duration: number // in minutes
  clientName: string
  emoji: string
  label: string
}

let dummyBookings: Booking[] = [
  {
    type: 'onboarding',
    startTime: 630, // 10:30 AM
    duration: 40,
    clientName: 'Alice',
    emoji: '🦊',
    label: 'Kickoff Call'
  },
  {
    type: 'followup',
    startTime: 690, // 11:30 AM
    duration: 20,
    clientName: 'Bob',
    emoji: '🐻',
    label: 'Check-in'
  },
  {
    type: 'followup',
    startTime: 810, // 1:30 PM
    duration: 20,
    clientName: 'Charlie',
    emoji: '🦁',
    label: 'Status Update'
  },
  {
    type: 'onboarding',
    startTime: 870, // 2:30 PM
    duration: 40,
    clientName: 'Diana',
    emoji: '🦄',
    label: 'Onboarding'
  },
  {
    type: 'followup',
    startTime: 1050, // 5:30 PM
    duration: 20,
    clientName: 'Eve',
    emoji: '🐱',
    label: 'Follow-up'
  },
  {
    type: 'followup',
    startTime: 1110, // 6:30 PM
    duration: 20,
    clientName: 'Frank',
    emoji: '🦉',
    label: 'Feedback'
  }
]

dummyBookings = dummyBookings.map((booking) => ({ ...booking, id: createId() }))

const getTotalSlots = () => {
  const start = 10 * 60 + 30 //10:30am
  const end = (12 + 7) * 60 + 30 // 7:30pm
  const slotWidth = 20
  return (end - start) / slotWidth
}

const generateSlotsObjArray = () => {
  const slots: Array<TimeSlot> = []
  const start = 10 * 60 + 30
  const slotDuration = 20
  for (let i = 0; i < getTotalSlots(); i++) {
    const startTime = start + i * slotDuration
    const endTime = startTime + slotDuration
    slots.push({
      startTime,
      endTime
    })
  }
  return slots
}

const SlotsView: React.FC<SlotsViewProps> = (props) => {
  const { selectedDate } = props
  const slots = generateSlotsObjArray()
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [open, setOpen] = useState(false)

  const isNextSlotAvailable = (): boolean => {
    if (selectedSlot === 1150) return false
    if (selectedSlot !== null) {
      const nextSlot = selectedSlot + 20
      const hasBooking = bookings.find((item) => item.startTime === nextSlot)
      return !Boolean(hasBooking)
    } else return false
  }

  useEffect(() => {
    if (!open) setSelectedSlot(null)
  }, [open])

  const generateSlotsWithBookings = () => {
    const bookingSlots: Array<{
      type: 'booked' | 'empty'
      booking?: Booking
      span: number
      startTime: number
    }> = []
    for (let i = 0; i < slots.length; ) {
      const slot = slots[i]
      const booking = bookings
        .sort((a, b) => a.startTime - b.startTime)
        .find((booking) => booking.startTime === slot.startTime)
      if (booking) {
        const span = booking.duration / 20
        bookingSlots.push({
          type: 'booked',
          startTime: slot.startTime,
          booking,
          span
        })
        i += span
      } else {
        bookingSlots.push({
          type: 'booked',
          startTime: slot.startTime,
          span: 1
        })
        i += 1
      }
    }
    return bookingSlots
  }

  return (
    <section className="space-y-8">
      <SlotBookingDialog
        setBookings={setBookings}
        selectedDate={selectedDate}
        open={open}
        setOpen={setOpen}
        selectedSlot={selectedSlot}
        isNextSlotAvailable={isNextSlotAvailable()}
      />
      <div className="bg-background rounded-xl grid grid-cols-[144px_1fr] overflow-hidden">
        <div>
          {slots.map((slot, idx) => {
            return <SlotTime slot={slot} key={`${idx}-slot-time`} />
          })}
        </div>
        <div>
          {generateSlotsWithBookings().map((slot, idx) => {
            if (slot.booking) {
              return <SlotBooked key={`${idx}-slot-booked`} slot={slot} />
            } else {
              return (
                <SlotEmpty
                  key={`${idx}-slot-empty`}
                  handleAvailableSlotClick={() => {
                    setSelectedSlot(slot.startTime)
                    setOpen(true)
                  }}
                />
              )
            }
          })}
        </div>
      </div>
    </section>
  )
}

export default SlotsView
