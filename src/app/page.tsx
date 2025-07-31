'use client'

import Header from '@/components/header'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'

export default function Home() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <main
      className="bg-background w-full text-foreground transition-all duration-350 h-dvh overflow-hidden"
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.5, 0.75, 1)' }}
    >
      <Header date={date} />
      <section className="grid grid-cols-[1fr_480px]">
        <ScrollArea className="border-r h-[calc(100dvh-64px)]">
          <div className="p-6 space-y-4">
            {[...Array(27)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 hover:bg-muted transition">
                <p className="text-sm font-medium">
                  🕒 Slot {i + 1} — {(10.5 + i * 0.25).toFixed(2)} hrs
                </p>
                <p className="text-muted-foreground text-xs">Details go here</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className="h-[calc(100dvh-64px)]">
          <div className="p-6 space-y-8">
            <div className="border p-4 rounded-xl">📅 Mini Calendar Here</div>
            <div className="border p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Today&apos;s Schedule</h3>
              <ul className="list-disc pl-4 text-sm text-muted-foreground">
                <li>🧘‍♂️ Meditation - 8:00 AM</li>
                <li>🩺 Dr. Strange Consultation - 11:00 AM</li>
                <li>💊 Medicine Reminder - 5:00 PM</li>
              </ul>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestiae dolore,
              deserunt veritatis maxime cum at? Cupiditate, officiis! Quia, quae. Nisi, delectus
              asperiores velit inventore repellat, pariatur earum dicta expedita sit iure laborum
              ipsum omnis autem cupiditate ut vitae ad sequi commodi quod assumenda quo. Tenetur
              numquam vel mollitia. Eaque omnis vel dolore unde itaque ut aut. Nam, debitis minima
              mollitia non quisquam repellat illum aut magnam pariatur, ad veritatis a voluptatibus
              tempore? Officia, similique enim sit dolore velit quia nulla nesciunt architecto
              aperiam modi, commodi unde ipsam dolorem temporibus magni. Repudiandae tempore
              distinctio dolorem ducimus recusandae? Earum, ducimus accusamus!
            </div>
          </div>
        </ScrollArea>
      </section>
    </main>
  )
}
