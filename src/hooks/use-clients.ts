import { db } from '@/firebase/firebase.config'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export type Client = {
  id: string
  fullName: string
  phoneNumber: string
}

type UseClientsReturnType = {
  clients: Client[]
  loading: boolean
}

export function useClients(): UseClientsReturnType {
  const [clients, setClients] = useState<Array<Client>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getClients = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'clients'))
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Client[]
        setClients(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getClients()
  }, [])

  return { clients, loading }
}
