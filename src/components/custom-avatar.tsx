import React from 'react'
import { createAvatar } from '@dicebear/core'
import { personas } from '@dicebear/collection'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type Props = {
  fullName: string
  phoneNumber: string
}

export default function CustomAvatar({ fullName, phoneNumber }: Props) {
  const avatar = createAvatar(personas, {
    seed: fullName + phoneNumber
  })

  const svg = avatar.toDataUri()

  return (
    <Avatar className="rounded-lg">
      <AvatarImage src={svg} alt={fullName} />
      <AvatarFallback>
        {fullName.split('')[0].toUpperCase() + fullName.split('')[0].toLowerCase()}
      </AvatarFallback>
    </Avatar>
  )
}
