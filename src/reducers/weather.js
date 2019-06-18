import { GET_WEATHER } from 'actions/types'
import defaultState from './defaultState'

const weather = (state = defaultState.weather, action) => {
  switch(action.type) {
    case GET_WEATHER: {
      const { data, zipCode } = action.payload
      const conditions = getWeatherCondition(data.list)

      return {...state, [zipCode]: conditions}
    }
    default:
      return state
  }
}

const getWeatherCondition = list => {
  const conditions = []

  list.forEach(data => {
    const obj = {
      dt: data.dt * 1000,
      icon: data.weather[0].icon
    }
    conditions.push(obj)
  })

  return conditions
}

export {
  weather
}
