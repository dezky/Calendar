import moment from 'moment'

import { GET_MONTH } from './types'

const getFirstSunday = (month, year) => {
  return moment().set({month, year}).startOf('month').day(0)
}

const getLastSaturday = (month, year) => {
  return moment().set({month, year}).endOf('month').day(6)
}

const getMonth = (month, year) => {
  const actualMonth = moment().set({month, year}).format('MMMM')
  const firstDayOfMonth = getFirstSunday(month, year)
  const lastDayOfMonth = getLastSaturday(month, year)
  let days = []
  let index = 0

  while (lastDayOfMonth.isSameOrAfter(firstDayOfMonth)) {
    const day = {
      index,
      inMonth: firstDayOfMonth.get('month') === month,
      number: parseInt(firstDayOfMonth.format('DD'), 10),
      reminders: [{id: 1542, hour: 9, minute: 45, text: 'hola mundo como te va', city: 'Bahia Blanca', color: '#F00'},
      {id: 1543, hour: 9, minute: 45, text: 'Seguro', city: 'Bahia Blanca', color: '#0F0'},
      {id: 1534, hour: 9, minute: 45, text: 'Seguro', city: 'Bahia Blanca', color: ''}],
      dayOfWeek: firstDayOfMonth.day()
    }

    days.push(day)
    firstDayOfMonth.add(1, 'd')
    index++
  }

  return {
    type: GET_MONTH,
    payload: {
      name: actualMonth,
      days
    }
  }
}

export { getMonth }
