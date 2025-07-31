'use client'

import Calendar from '@/components/calendar/calendar'
import Header from '@/components/header'
import SlotsView from '@/components/slots/slots-view'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/hooks/use-theme'
import React, { useMemo, useState } from 'react'

export default function Home() {
  const { theme } = useTheme()
  const today = useMemo(() => {
    return new Date()
  }, [])
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  if (!theme) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  }

  return (
    <main
      className="bg-background w-full text-foreground transition-all duration-350 h-dvh overflow-hidden"
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.5, 0.75, 1)' }}
    >
      <Header date={selectedDate} />
      <section className="grid grid-cols-[1fr_480px] bg-muted">
        <ScrollArea className="border-r h-[calc(100dvh-64px)]">
          <div className="p-6 space-y-4">
            <SlotsView />
          </div>
        </ScrollArea>
        <ScrollArea className="h-[calc(100dvh-64px)]">
          <div className="p-6 space-y-8">
            <div className="border p-4 bg-background rounded-xl">
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div className="border p-4 bg-background rounded-xl">
              <h3 className="font-semibold mb-2">Today&apos;s Schedule</h3>
              <ul className="list-disc pl-4 text-sm text-muted-foreground">
                <li>🧘‍♂️ Meditation - 8:00 AM</li>
                <li>🩺 Dr. Strange Consultation - 11:00 AM</li>
                <li>💊 Medicine Reminder - 5:00 PM</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </section>
    </main>
  )
}
