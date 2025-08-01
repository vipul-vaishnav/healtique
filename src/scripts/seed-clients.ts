import { db } from './../firebase/firebase.config'
import { fakerEN_IN as faker } from '@faker-js/faker'
import { addDoc, collection } from 'firebase/firestore'

// **IMP NOTE** :- process.env.ANY_VALUE_OF_CONFIG is undefined to seed db either use dotenv or use direct values in firebase config otherwise the script will give error

const generateFakeClient = (): {
  fullName: string
  phone: string
} => {
  const random = Math.floor(Math.random() * 2)
  const firstName = faker.person.firstName(random === 0 ? 'male' : 'female').trim()
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
      const client = generateFakeClient()
      console.log(client)
      const docRef = await addDoc(collection(db, 'clients'), {
        fullName: client.fullName,
        phoneNumber: client.phone
      })
    }
  } catch (error) {
    console.log(error)
  }
}

seedDb()
