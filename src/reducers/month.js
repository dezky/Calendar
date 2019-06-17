import { GET_MONTH, ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER, DELETE_ALL_REMINDERS } from 'actions/types'
import defaultState from './defaultState'

const month = (state = defaultState.month, action) => {
  switch(action.type) {
    case GET_MONTH: {
      return action.payload
    }
    case ADD_REMINDER: {
      return addReminder(state, action)
    }
    case UPDATE_REMINDER: {
      return updateReminder(state, action)
    }
    case DELETE_REMINDER: {
      return deleteReminder(state, action)
    }
    case DELETE_ALL_REMINDERS: {
      return deleteAllReminders(state, action)
    }
    default:
      return state
  }
}

const addReminder = (state, action) => {
  const { day, reminder } = action.payload
  const { days } = state
  const idx = days.findIndex(data => data.number === day && data.inMonth)

  days[idx].reminders.push(reminder)

  return {
    ...state,
    days
  }
}

const updateReminder = (state, action) => {
  const { previusDayIndex, reminder } = action.payload
  const { days } = state
  let reminders = days[previusDayIndex].reminders

  days[previusDayIndex].reminders = reminders.filter(data => data.id !== reminder.id)

  return addReminder({...state, days}, action)
}

const deleteReminder = (state, action) => {
  const { dayIndex, id } = action.payload
  const { days } = state
  let reminders = days[dayIndex].reminders

  days[dayIndex].reminders = reminders.filter(data => data.id !== id)

  return {...state, days}
}

const deleteAllReminders = (state, action) => {
  const dayIndex = action.payload
  const { days } = state
  days[dayIndex].reminders = []

  return {...state, days}
}

export {
  month
}
