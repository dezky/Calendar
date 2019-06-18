import { combineReducers } from 'redux'
import { month } from './month'
import { weather } from './weather'

const rootReducer = combineReducers({
  month,
  weather
})

export {
  rootReducer
}
