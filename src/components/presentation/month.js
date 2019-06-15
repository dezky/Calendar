import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chunk } from 'lodash'

import { Day } from './day'

const getBorderLeftHeader = position => {
  if (position === 0) {
    return '1px solid #2e73b4'
  }

  return 'none'
}
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const Wrapper = styled.div`

`
const Row = styled.div`
  display: flex;
`
const HeaderItem = styled.div`
  width: 150px;
  background-color: #2e73b4;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-right: 1px solid #2e73b4;
  border-left: ${({ position }) => getBorderLeftHeader(position)};
`
const renderRowOfDays = (days, firstRow) => {
  return days.map((day, index) => {
    return <Day key={`day-${index}`} day={day} firstRow={firstRow}/>
  })
}
const renderDays = days => {
  const rows = chunk(days, 7)
  return rows.map((row, index) => {
    const firstRow = index === 0
    return <Row key={`row-${index}`}>{renderRowOfDays(row, firstRow)}</Row>
  })
}
const renderHeader = () => {
  return daysOfWeek.map((name, index) => {
    return <HeaderItem key={`header-${index}`} position={index}>{name}</HeaderItem>
  })
}

const Month = ({ month }) => {
  const { name, days } = month

  if (!days) {
    return null
  }

  return (
    <Wrapper>
      <h1>{name}</h1>
      <Row>{renderHeader()}</Row>
      {renderDays(days)}
    </Wrapper>
  )
}

Month.propTypes = {
  month: PropTypes.object.isRequired
}

export {
  Month
}
