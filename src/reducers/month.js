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
  const hour1 = parseInt(rem1.hour, 10)
  const hour2 = parseInt(rem2.hour, 10)
  const minute1 = parseInt(rem1.minute, 10)
  const minute2 = parseInt(rem2.minute, 10)

  if (hour1 < hour2) {
    console.log("return -1")
    return -1
  }
  if (hour2 < hour1) {
    console.log("return 1")
    return 1
  }
  if (hour1 === hour2) {
    if (minute1 < minute2) {
      console.log("return -1")
      return -1
    } else if (minute2 < minute1) {
      console.log("return 1")
      return 1
    }
  }
  console.log("return 0")

  return 0;
}

export {
  month
}
