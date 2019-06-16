import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Reminder } from './reminder'

const getBackgroundColor = dayOfWeek => {
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return '#F1F1F1'
  }

  return '#FFF'
}
const getBorderLeft = dayOfWeek => {
  if (dayOfWeek === 0) {
    return '1px solid #888'
  }

  return 'none'
}
const getBorderTop = firstRow => {
  if (firstRow) {
    return '1px solid #888'
  }

  return 'none'
}
const getColor = dayOfWeek => {
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return '#376d9f'
  }

  return '#000'
}
const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ dayOfWeek }) => getBackgroundColor(dayOfWeek)};
  border-bottom: 1px solid #888;
  border-left: ${({ dayOfWeek }) => getBorderLeft(dayOfWeek)};
  border-right: 1px solid #888;
  border-top: ${({ firstRow }) => getBorderTop(firstRow)};
  color: ${({ dayOfWeek }) => getColor(dayOfWeek)};
  overflow-y: auto;
`
const Number = styled.div`
  margin: 5px 0 0 5px;
`
const WrapperReminders = styled.ul`
  padding: 0 5px;
`
const renderReminders = reminders => {
  return reminders.map(reminder => {
    return <Reminder key={reminder.id} reminder={reminder} />
  })
}

const Day = ({ day, firstRow }) => {
  const { dayOfWeek, number, reminders } = day

  return (
    <Wrapper dayOfWeek={dayOfWeek} firstRow={firstRow}>
      <Number>{number}</Number>
      <WrapperReminders>{renderReminders(reminders)}</WrapperReminders>
    </Wrapper>
  )
}

Day.propTypes = {
  firstRow: PropTypes.bool,
  day: PropTypes.object.isRequired
}

export {
  Day
}
