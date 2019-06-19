import API from 'apis'
import { GET_WEATHER } from './types'

const API_KEY = '0382207c62b88e4196e2507c1e229aab'

const getWeather = (city, country) => async dispatch => {
  const response = await API.get(`/forecast?q=${city},${country}&appid=${API_KEY}`)

  dispatch({
    type: GET_WEATHER,
    payload: {
      data: response.data,
      city,
      country
    }
  })
}

export {
  getWeather
}
