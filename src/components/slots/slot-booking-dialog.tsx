import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ClientsCombobox } from '../clients-combobox'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Textarea } from '../ui/textarea'
import { Booking } from './slots-view'
import { getDay } from 'date-fns'
import { useClients } from '@/hooks/use-clients'
import { toast } from 'sonner'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'

type SlotBookingDialogProps = {
  selectedSlot: number | null
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
  selectedDate: Date
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isNextSlotAvailable: boolean
}

const SlotBookingDialog: React.FC<SlotBookingDialogProps> = (props) => {
  const { open, setOpen, selectedDate, isNextSlotAvailable, setBookings, selectedSlot } = props
  const { clients, loading } = useClients()
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [value, setValue] = useState('')
  const [call, setCall] = useState<Booking['type']>()
  const [submitting, setSubmitting] = useState(false)

  const handleCallBook = async () => {
    if (!title) {
      return toast.error('Title is missing!')
    } else if (!call) {
      return toast.error('Select a call type')
    } else if (!value) {
      return toast.error('Please select a client')
    }

    const clientVal = clients.find((client) => client.id === value)
    if (!clientVal) {
      return toast.error('Client not found')
    }

    const newBooking = {
      client: {
        fullName: clientVal?.fullName,
        id: clientVal?.id,
        phoneNumber: clientVal?.phoneNumber
      },
      date: selectedDate,
      duration: call === 'followup' ? 20 : 40,
      startTime: selectedSlot!,
      title,
      type: call!,
      dayOfWeek: getDay(selectedDate),
      note: note
    }

    try {
      setSubmitting(true)
      const docRef = await addDoc(collection(db, 'bookings'), newBooking)
      toast.success('Booking created with Id: ' + docRef.id)
      setBookings((prev) => {
        const updated: Booking[] = [...prev, newBooking]
        return updated.sort((a, b) => a.startTime - b.startTime)
      })
      setOpen(false)
    } catch (error) {
      console.log('[Booking_ERR]', error)
      toast.error('Unable to create booking, try again')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setCall(undefined)
    setValue('')
    setNote('')
  }

  useEffect(resetForm, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {loading ? (
        <DialogContent>
          <DialogTitle>Loading...</DialogTitle>
          <div className="flex items-center justify-center h-[540px] w-full">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book a Call?</DialogTitle>
            <DialogDescription>Fill in the details to schedule your call.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="title" aria-required="true">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-4" aria-required="true">
                Select Call Type
              </Label>
              <RadioGroup
                value={call ?? ''}
                onValueChange={(value) => setCall(value as typeof call)}
              >
                {isNextSlotAvailable && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="onboarding" id="option-one" />
                    <Label htmlFor="option-one">Onboarding</Label>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="followup" id="option-two" />
                  <Label htmlFor="option-two">Follow Up</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="date" aria-required="true">
                Date
              </Label>
              <Input
                id="date"
                name="title"
                type="date"
                defaultValue={selectedDate.toISOString().split('T')[0]}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label className="mb-3" aria-required="true">
                Select Client
              </Label>
              <ClientsCombobox clients={clients} value={value} setValue={setValue} />
            </div>
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="message">Your message</Label>
            <Textarea
              placeholder="Add Note (optional)"
              id="message"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={submitting}
              onClick={handleCallBook}
              className="bg-chart-4 text-white hover:bg-chart-4/50"
            >
              Book Call
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
export default SlotBookingDialog
