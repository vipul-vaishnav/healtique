// import React from 'react'
// import SlotViewHeader from './slot-view-header'

// type SlotsViewProps = {
//   dummy?: boolean
// }

// type TimeSlot = {
//   startTime: number // in minutes from midnight (00:00 AM)
//   endTime: number
//   label: string // e.g. "10:30 AM"
// }

// type Booking = {
//   type: 'onboarding' | 'followup'
//   startTime: number // minutes from midnight
//   duration: number // in minutes
//   clientName: string
//   emoji: string
//   label: string
// }

// const dummyBookings: Booking[] = [
//   {
//     type: 'onboarding',
//     startTime: 630, // 10:30 AM
//     duration: 40,
//     clientName: 'Alice',
//     emoji: '🦊',
//     label: 'Kickoff Call'
//   },
//   {
//     type: 'followup',
//     startTime: 690, // 11:30 AM
//     duration: 20,
//     clientName: 'Bob',
//     emoji: '🐻',
//     label: 'Check-in'
//   },
//   {
//     type: 'followup',
//     startTime: 810, // 1:30 PM
//     duration: 20,
//     clientName: 'Charlie',
//     emoji: '🦁',
//     label: 'Status Update'
//   },
//   {
//     type: 'onboarding',
//     startTime: 870, // 2:30 PM
//     duration: 40,
//     clientName: 'Diana',
//     emoji: '🦄',
//     label: 'Onboarding'
//   },
//   {
//     type: 'followup',
//     startTime: 1050, // 5:30 PM
//     duration: 20,
//     clientName: 'Eve',
//     emoji: '🐱',
//     label: 'Follow-up'
//   },
//   {
//     type: 'followup',
//     startTime: 1110, // 6:30 PM
//     duration: 20,
//     clientName: 'Frank',
//     emoji: '🦉',
//     label: 'Feedback'
//   }
// ]

// const getTotalSlots = () => {
//   const start = 10 * 60 + 30 //10:30am
//   const end = (12 + 7) * 60 + 30 // 7:30pm
//   const slotWidth = 20
//   return (end - start) / slotWidth
// }

// const getLabel = (startTime: number): string => {
//   const hours = Math.floor(startTime / 60)
//   const minutes = startTime % 60
//   const period = hours >= 12 ? 'PM' : 'AM'
//   const displayHour = hours % 12 === 0 ? 12 : hours % 12
//   const paddedMinutes = minutes.toString().padStart(2, '0')
//   return `${displayHour}:${paddedMinutes} ${period}`
// }

// const generateSlotsObjArray = () => {
//   const slots: Array<TimeSlot> = []
//   const start = 10 * 60 + 30
//   const slotDuration = 20
//   for (let i = 0; i < getTotalSlots(); i++) {
//     const startTime = start + i * slotDuration
//     const endTime = startTime + slotDuration
//     const label = getLabel(startTime)
//     slots.push({
//       startTime,
//       endTime,
//       label
//     })
//   }
//   return slots
// }

// const SlotsView: React.FC<SlotsViewProps> = () => {
//   return (
//     <section className="space-y-8">
//       {/* <SlotViewHeader /> */}
//       <div className="bg-background rounded-xl grid grid-cols-[144px_1fr]">
//         <div>
//           {generateSlotsObjArray().map((slot, idx) => {
//             return (
//               <div key={`${idx}-slot`} className="h-24 p-4 w-36 border-b border-r border-t">
//                 <p className="text-sm font-semibold">{slot.label}</p>
//               </div>
//             )
//           })}
//         </div>
//         <div>
//           {generateSlotsObjArray().map((slot, idx) => {
//             return (
//               <div key={idx} className="h-24 p-4 border-b">
//                 {idx % 2 === 0 ? (
//                   <div className="h-full bg-[#D8DBFF] border-l-5 border-[#5C6CC6] dark:bg-[#394069]/80 dark:backdrop-blur-3xl dark:text-[#dfe2ff] rounded-sm text-sm font-normal p-2">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, iste.
//                   </div>
//                 ) : (
//                   <div className="h-full bg-[#EAFDEE] rounded-sm border-l-5 border-[#44B259] dark:bg-[#266030]/80 dark:backdrop-blur-3xl dark:text-[#EAFDEE] text-sm font-normal p-2">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, iste.
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SlotsView

import React from 'react'
import SlotViewHeader from './slot-view-header'

type SlotsViewProps = {
  dummy?: boolean
}

type TimeSlot = {
  startTime: number // in minutes from midnight (00:00 AM)
  endTime: number
  label: string // e.g. "10:30 AM"
}

type Booking = {
  type: 'onboarding' | 'followup'
  startTime: number // minutes from midnight
  duration: number // in minutes
  clientName: string
  emoji: string
  label: string
}

const dummyBookings: Booking[] = [
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

const getTotalSlots = () => {
  const start = 10 * 60 + 30 //10:30am
  const end = (12 + 7) * 60 + 30 // 7:30pm
  const slotWidth = 20
  return (end - start) / slotWidth
}

const getLabel = (startTime: number): string => {
  const hours = Math.floor(startTime / 60)
  const minutes = startTime % 60
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 === 0 ? 12 : hours % 12
  const paddedMinutes = minutes.toString().padStart(2, '0')
  return `${displayHour}:${paddedMinutes} ${period}`
}

const generateSlotsObjArray = () => {
  const slots: Array<TimeSlot> = []
  const start = 10 * 60 + 30
  const slotDuration = 20
  for (let i = 0; i < getTotalSlots(); i++) {
    const startTime = start + i * slotDuration
    const endTime = startTime + slotDuration
    const label = getLabel(startTime)
    slots.push({
      startTime,
      endTime,
      label
    })
  }
  return slots
}

const SlotsView: React.FC<SlotsViewProps> = () => {
  const slots = generateSlotsObjArray()
  let skip = 0

  return (
    <section className="space-y-8">
      <div className="bg-background rounded-xl grid grid-cols-[144px_1fr]">
        {/* Time Labels */}
        <div>
          {slots.map((slot, idx) => (
            <div key={`${idx}-slot`} className="h-24 p-4 w-36 border-b border-r border-t">
              <p className="text-sm font-semibold">{slot.label}</p>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <div>
          {slots.map((slot, idx) => {
            if (skip > 0) {
              skip--
              return null
            }

            const booking = dummyBookings.find((b) => b.startTime === slot.startTime)

            if (booking) {
              const slotCount = booking.duration / 20
              skip = slotCount - 1

              const bg =
                booking.type === 'onboarding'
                  ? 'bg-[#D8DBFF] dark:bg-[#394069]/80'
                  : 'bg-[#EAFDEE] dark:bg-[#266030]/80'
              const border =
                booking.type === 'onboarding'
                  ? 'border-l-5 border-[#5C6CC6]'
                  : 'border-l-5 border-[#44B259]'

              return (
                <div
                  key={idx}
                  className={`p-2 rounded-sm text-sm font-normal text-foreground ${bg} ${border} dark:backdrop-blur-3xl`}
                  style={{ height: `${slotCount * 6}rem` }} // each slot is 6rem
                >
                  <p className="text-sm font-semibold">
                    {booking.emoji} {booking.clientName}
                  </p>
                  <p className="text-xs">{booking.label}</p>
                </div>
              )
            }

            return <div key={idx} className="h-24 p-4 border-b" />
          })}
        </div>
      </div>
    </section>
  )
}

export default SlotsView
