import { ADD_REMINDER } from './types'

const addReminder = (day, reminder) => {
  console.log("pepe", day, reminder)
  return {
    type: ADD_REMINDER,
    payload: {
      day,
      reminder
    }
  }
}

export { addReminder }
