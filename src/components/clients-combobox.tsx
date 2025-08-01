'use client'

import * as React from 'react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Client } from '@/hooks/use-clients'
import CustomAvatar from './custom-avatar'

type Props = {
  clients: Client[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export function ClientsCombobox(props: Props) {
  const { value, setValue, clients } = props
  const [open, setOpen] = React.useState(false)

  const selectedClient = clients.find((client) => client.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedClient ? selectedClient.fullName : 'Select Client...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 h-auto">
        <Command
          filter={(value, search) => {
            const client = clients.find((c) => c.id === value)
            if (!client) return 0
            const searchLower = search.toLowerCase()
            return client.fullName.toLowerCase().includes(searchLower) ||
              client.phoneNumber.includes(search)
              ? 1
              : 0
          }}
        >
          <CommandInput placeholder="Search by name or phone..." />
          <CommandList>
            <CommandEmpty>No Client Found.</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => {
                const isSelected = value === client.id
                return (
                  <CommandItem
                    key={client.id}
                    value={client.id}
                    onSelect={() => {
                      setValue(isSelected ? '' : client.id)
                      setOpen(false)
                    }}
                  >
                    <CheckIcon
                      className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                    <div className="flex items-center gap-2">
                      <CustomAvatar fullName={client.fullName} phoneNumber={client.phoneNumber} />
                      <div className="flex flex-col">
                        <span>{client.fullName}</span>
                        <span className="text-xs text-muted-foreground">{client.phoneNumber}</span>
                      </div>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
