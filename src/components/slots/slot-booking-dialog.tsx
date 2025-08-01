import React, { useState } from 'react'
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
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [value, setValue] = useState('')
  const [call, setCall] = useState<Booking['type']>()

  const handleCallBook = () => {
    setBookings((prev) => {
      prev.sort((a, b) => a.startTime - b.startTime)
      return [
        ...prev,
        {
          clientName: value,
          duration: call === 'followup' ? 20 : 40,
          emoji: '⏱️',
          label: title,
          startTime: selectedSlot!,
          type: call!
        }
      ]
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <RadioGroup value={call ?? ''} onValueChange={(value) => setCall(value as typeof call)}>
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
            <ClientsCombobox value={value} setValue={setValue} />
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
          <Button onClick={handleCallBook} className="bg-chart-4 text-white hover:bg-chart-4/50">
            Book Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default SlotBookingDialog
