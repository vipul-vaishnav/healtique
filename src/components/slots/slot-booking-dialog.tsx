import React from 'react'
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

type SlotBookingDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SlotBookingDialog: React.FC<SlotBookingDialogProps> = (props) => {
  const { open, setOpen } = props
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
            <Input id="title" name="title" defaultValue="" />
          </div>
          <div>
            <Label className="mb-4" aria-required="true">
              Select Call Type
            </Label>
            <RadioGroup defaultValue="">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onboarding" id="option-one" />
                <Label htmlFor="option-one">Onboarding</Label>
              </div>
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
            <Input id="date" name="title" defaultValue="" readOnly disabled />
          </div>
          <div>
            <Label className="mb-4" aria-required="true">
              Select Client
            </Label>
            <ClientsCombobox />
          </div>
        </div>
        <div className="grid w-full gap-3">
          <Label htmlFor="message">Your message</Label>
          <Textarea placeholder="Add Note(optional)" id="message" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-chart-4 text-white hover:bg-chart-4/50">
            Book Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default SlotBookingDialog
