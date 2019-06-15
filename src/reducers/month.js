import { GET_MONTH } from 'actions/types'
import defaultState from './defaultState'

const month = (state = defaultState.month, action) => {
  switch(action.type) {
    case GET_MONTH: {
      return action.payload
    }
    default:
      return state
  }
}

export {
  month
}
