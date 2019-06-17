import { GET_MONTH, ADD_REMINDER } from 'actions/types'
import defaultState from './defaultState'

const month = (state = defaultState.month, action) => {
  console.log(action.type)
  switch(action.type) {
    case GET_MONTH: {
      return action.payload
    }
    case ADD_REMINDER: {
      console.log("llega")
      return addReminder(state, action)
    }
    default:
      return state
  }
}

const addReminder = (state, action) => {
  const { day, reminder } = action.payload
  const { days } = state
  console.log(action.payload)
  const idx = days.findIndex(data => data.number === day && data.inMonth)
  console.log(idx)
  reminder.id = Date.now()

  days[idx].reminders.push(reminder)

  return {
    ...state,
    days
  }

}

export {
  month
}
