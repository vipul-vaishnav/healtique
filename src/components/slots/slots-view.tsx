import React, { useEffect, useState } from 'react'
import SlotBooked from './slot-booked'
import SlotEmpty from './slot-empty'
import SlotTime from './slot-time'
import SlotBookingDialog from './slot-booking-dialog'
import { collection, getDocs, query, where, and } from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'
import { getDay } from 'date-fns'

type SlotsViewProps = {
  selectedDate: Date
}

export type TimeSlot = {
  startTime: number // in minutes from midnight (00:00 AM)
  endTime: number
}

export type Booking = {
  type: 'onboarding' | 'followup'
  startTime: number // minutes from midnight 10:30 -> 630, 7:30 -> 19 * 60 + 30
  duration: number // in minutes
  client: {
    id: string
    fullName: string
    phoneNumber: string
  }
  title: string
  date: Date
  dayOfWeek?: number // 0 -> Sun && 6 -> Sat
  note?: string
}

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

  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    const getBookingPerDate = async () => {
      try {
        setIsLoading(true)
        const bookingsRef = collection(db, 'bookings')

        const q1 = query(
          bookingsRef,
          and(where('date', '==', selectedDate), where('type', '==', 'onboarding'))
        )
        const snap1 = await getDocs(q1)
        const oneTime = snap1.docs.map((doc) => doc.data())

        console.log(oneTime)

        const q2 = query(
          bookingsRef,
          and(where('dayOfWeek', '==', getDay(selectedDate)), where('type', '==', 'followup'))
        )
        const snap2 = await getDocs(q2)
        const recurring = snap2.docs.map((doc) => doc.data())

        console.log(recurring)

        const finalBookings = [...oneTime, ...recurring] as Booking[]
        setBookings(finalBookings)
      } catch (error) {
        console.log('[Bookings_fetch_ERR] ', error)
      } finally {
        setIsLoading(false)
      }
    }
    getBookingPerDate()
  }, [selectedDate])

  useEffect(() => {
    if (!open) setSelectedSlot(null)
  }, [open])

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
                  selectedDate={selectedDate}
                  startTime={slot.startTime}
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
