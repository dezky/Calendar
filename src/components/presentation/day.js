import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
const Wrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${({ dayOfWeek }) => getBackgroundColor(dayOfWeek)};
  border-bottom: 1px solid #888;
  border-left: ${({ dayOfWeek }) => getBorderLeft(dayOfWeek)};
  border-right: 1px solid #888;
  border-top: ${({ firstRow }) => getBorderTop(firstRow)};
`
const Number = styled.div`
  margin: 5px 0 0 5px;
`

const Day = ({ day, firstRow }) => {
  const { dayOfWeek, number } = day

  return (
    <Wrapper dayOfWeek={dayOfWeek} firstRow={firstRow}>
      <Number>{number}</Number>
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
