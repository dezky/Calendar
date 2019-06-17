import { DELETE_REMINDER } from './types'

const deleteReminder = (dayIndex,  id) => {
  return {
    type: DELETE_REMINDER,
    payload: {
      dayIndex,
      id
    }
  }
}

export { deleteReminder }
