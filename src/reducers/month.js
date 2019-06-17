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
  const reminders = days[idx].reminders

  reminders.push(reminder)
  days[idx].reminders = reminders.sort(compareReminder)

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

const compareReminder = (rem1, rem2) => {
  if (rem1.hour < rem2.hour) {
    return -1
  }
  if (rem2.hour < rem1.hour) {
    return 1
  }
  if (rem1.hour === rem2.hour) {
    if (rem1.minute < rem2.minute) {
      return -1
    } else if (rem2.minute < rem1.minute) {
      return 1
    }
  }


  return 0;
}

export {
  month
}
