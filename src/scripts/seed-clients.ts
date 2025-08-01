import { db } from './../firebase/firebase.config'
import { fakerEN_IN as faker } from '@faker-js/faker'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

// **IMP NOTE** :- process.env.ANY_VALUE_OF_CONFIG is undefined to seed db either use dotenv or use direct values in firebase config otherwise the script will give error

const generateFakeClient = (
  idx: number
): {
  fullName: string
  phone: string
} => {
  const firstName = faker.person.firstName(idx % 2 === 0 ? 'male' : 'female').trim()
  const lastName = faker.person.lastName().trim()

  const rawPhone = faker.phone
    .number({
      style: 'national'
    })
    .trim()
    .replace(/\D/g, '')

  const phone = `+91 ${rawPhone.length > 10 ? rawPhone.slice(-10) : rawPhone}`

  return {
    fullName: firstName + ' ' + lastName,
    phone: phone
  }
}

async function seedDb() {
  try {
    for (let i = 0; i < 20; i++) {
      const client = generateFakeClient(i)
      console.log(client)
      const docRef = await addDoc(collection(db, 'clients'), {
        fullName: client.fullName,
        phoneNumber: client.phone,
        createdAt: serverTimestamp()
      })
    }
  } catch (error) {
    console.log(error)
  }
}

seedDb()
