import { ADD_REMINDER } from './types'

const addReminder = (day, reminder) => {
  return {
    type: ADD_REMINDER,
    payload: {
      day,
      reminder
    }
  }
}

export { addReminder }
