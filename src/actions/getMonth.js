import moment from 'moment'

import { GET_MONTH } from './types'

const getFirstSunday = (month, year) => {
  return moment().set({month, year}).startOf('month').day(0)
}

const getLastSaturday = (month, year) => {
  return moment().set({month, year}).endOf('month').day(6)
}

const getMonth = (month, year) => {
  const firstDayOfMonth = getFirstSunday(month, year)
  const lastDayOfMonth = getLastSaturday(month, year)
  let days = []

  while (lastDayOfMonth.diff(firstDayOfMonth, 'days') >= 0) {
    const day = {
      inMonth: firstDayOfMonth.get('month') === month,
      number: parseInt(firstDayOfMonth.format('DD'), 10),
      reminders: [],
      dayOfWeek: firstDayOfMonth.day()
    }

    days.push(day)
    firstDayOfMonth.add(1, 'd')
  }

  return {
    type: GET_MONTH,
    payload: days
  }
}

export { getMonth }
