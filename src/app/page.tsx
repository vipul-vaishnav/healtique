import { ThemeToggle } from '@/components/theme-toggle'
import React from 'react'

export default function Home() {
  return (
    <main
      className="bg-background w-full text-foreground transition-all duration-350 min-h-dvh"
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.5, 0.75, 1)' }}
    >
      <ThemeToggle />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam quisquam corrupti debitis
      nobis modi sequi fugit mollitia, facere optio dolorum placeat consectetur. Enim laborum quos
      voluptate nihil aut, nesciunt delectus cumque fugit quis maxime optio amet temporibus quas
      veritatis ea! Corrupti doloribus quibusdam ex dicta officiis deserunt enim, expedita sed.
    </main>
  )
}
