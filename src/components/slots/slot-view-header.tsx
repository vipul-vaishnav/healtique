import React from 'react'

type SlotViewHeaderProps = {
  dummy?: string
}

const SlotViewHeader: React.FC<SlotViewHeaderProps> = () => {
  return (
    <div className="bg-background text-foreground rounded-xl p-4">
      <h6 className="font-bold">Time</h6>
    </div>
  )
}
export default SlotViewHeader
