import { db } from '@/firebase/firebase.config'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

type Client = {
  id: string
  fullName: string
  phoneNumber: string
}

export function useClients(): Array<Client> {
  const [clients, setClients] = useState<Array<Client>>([])

  useEffect(() => {
    const getClients = async () => {
      const querySnapshot = await getDocs(collection(db, 'clients'))
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Client[]
      setClients(data)
    }
    getClients()
  }, [])

  return clients
}
