import { DELETE_ALL_REMINDERS } from './types'

const deleteAllReminders = dayIndex => {
  return {
    type: DELETE_ALL_REMINDERS,
    payload: dayIndex
  }
}

export { deleteAllReminders }
