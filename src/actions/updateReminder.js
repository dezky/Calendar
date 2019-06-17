import { UPDATE_REMINDER } from './types'

const updateReminder = (day, previusDayIndex,  reminder) => {
  return {
    type: UPDATE_REMINDER,
    payload: {
      day,
      previusDayIndex,
      reminder
    }
  }
}

export { updateReminder }
