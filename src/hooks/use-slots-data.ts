import { Booking } from '@/components/slots/slots-view'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, and, Timestamp } from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'
import { getDay } from 'date-fns'

export const useSlotsData = (selectedDate: Date) => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getBookingPerDate = async () => {
      try {
        setIsLoading(true)
        const bookingsRef = collection(db, 'bookings')

        const startOfDay = new Date(selectedDate)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(selectedDate)
        endOfDay.setHours(23, 59, 59, 999)

        const q1 = query(
          bookingsRef,
          where('date', '>=', Timestamp.fromDate(startOfDay)),
          where('date', '<=', Timestamp.fromDate(endOfDay))
        )
        const snap1 = await getDocs(q1)
        const oneTime = snap1.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        const q2 = query(
          bookingsRef,
          and(where('dayOfWeek', '==', getDay(selectedDate)), where('type', '==', 'followup'))
        )
        const snap2 = await getDocs(q2)
        const recurring = snap2.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

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

  return {
    bookings,
    setBookings,
    isLoading
  }
}
