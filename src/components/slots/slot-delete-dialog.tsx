import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { db } from '@/firebase/firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'
import { Trash2 } from 'lucide-react'
import { Booking } from './slots-view'

type Props = {
  id: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

export function SlotDeleteDialog(props: Props) {
  const { open, setOpen, id, setBookings } = props

  const handleDelete = async () => {
    if (!id) return
    await deleteDoc(doc(db, 'bookings', id))
    setBookings((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this booking?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your booking and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-chart-4 hover:bg-chart-4/50" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
