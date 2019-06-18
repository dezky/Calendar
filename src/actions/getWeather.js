import API from 'apis'
import { GET_WEATHER } from './types'

const API_KEY = '0382207c62b88e4196e2507c1e229aab'

const getWeather = zipCode => async dispatch => {
  const response = await API.get(`/forecast?zip=${zipCode}&appid=${API_KEY}`)

  dispatch({
    type: GET_WEATHER,
    payload: {
      data: response.data,
      zipCode
    }
  })
}

export {
  getWeather
}
