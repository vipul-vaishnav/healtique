import React from 'react'

type SlotEmptyProps = {
  handleAvailableSlotClick: () => void
}

const SlotEmpty: React.FC<SlotEmptyProps> = ({ handleAvailableSlotClick }) => {
  return <button onClick={handleAvailableSlotClick} className="h-24 border-b block w-full" />
}
export default SlotEmpty
