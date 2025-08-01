# HealTique

Tech Stack

- Next.JS
- TypeScript
- TailwindCSS
- Firebase

# Calendar Helpers

Great question! Let's break down what each of these `date-fns` functions do — super useful when building a calendar UI or working with dates. Here's your cheat sheet:

---

### 🔹 `getDate(date)`

> Returns the **day of the month** (1–31) from a Date.

```ts
getDate(new Date('2025-07-31')) // 31
```

---

### 🔹 `getDaysInMonth(date)`

> Returns **how many days** there are in the month of the given date.

```ts
getDaysInMonth(new Date('2025-02-10')) // 28 (not leap year)
```

---

### 🔹 `getMonth(date)`

> Returns the **month index** (0-based: Jan = 0, Dec = 11).

```ts
getMonth(new Date('2025-07-31')) // 6 (July)
```

---

### 🔹 `getYear(date)`

> Returns the **4-digit year**.

```ts
getYear(new Date('2025-07-31')) // 2025
```

---

### 🔹 `format(date, formatString)`

> Formats a date to a string using a template.

```ts
format(new Date('2025-07-31'), 'yyyy-MM-dd') // "2025-07-31"
format(new Date(), 'MMM d, yyyy') // e.g. "Jul 31, 2025"
```

---

### 🔹 `isToday(date)`

> Returns `true` if the given date is today.

```ts
isToday(new Date()) // true
isToday(new Date('1999-01-01')) // false
```

---

### 🔹 `startOfMonth(date)`

> Returns a new Date representing the **start of the month** at midnight.

```ts
startOfMonth(new Date('2025-07-15')) // → 2025-07-01T00:00:00.000Z
```

---

### 🔹 `endOfMonth(date)`

> Returns a new Date representing the **end of the month** (last day at 23:59:59.999).

```ts
endOfMonth(new Date('2025-07-10')) // → 2025-07-31T23:59:59.999Z
```

---

### 🔹 `setDate(date, day)`

> Returns a new date by setting the **day of the month**.

```ts
setDate(new Date('2025-07-01'), 20) // → 2025-07-20
```

---

# Firebase Schema

```ts
interface Booking {
  client: {
    fullName: string
    id: string
    phoneNumber: string
  }
  date: Date
  dayOfWeek: number // 0-6 (Sunday to Saturday)
  duration: number // Duration in minutes (20 for followup and 40 for onboarding)
  note?: string // Optional field
  startTime: number // Minutes from midnight (starttime of slot, 10:30 -> 630)
  title: string
  type: 'onboarding' | 'followup'
}
```

# Assumptions Made

- Followups are weekly only
- Onboarding are one time
- can only book empty slots (2 consecutive empty - eligible for both, single empty -only follow up)
- 7:10 slot is only follow up
- past slots are expired cannot be booked

# Run

1. use

```sh
npm i
npm run dev
```

2. To seed firebase client

> Either use dotenv cause node environment can't get NEXT_PUBLIC prefixed variables or dont use .env for the script use firebase config directly, command

```
npm run script
```
