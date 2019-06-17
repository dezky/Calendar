import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const getColor = color => {
  if (color) {
    return '#FFF'
  }

  return '#000'
}
const getBorder = color => {
  if (color) {
    return 'none'
  }

  return '1px solid #000'
}
const Wrapper = styled.li`
  background-color: ${({ color }) => color};
  list-style: none;
  border-radius: 5px;
  padding: 5px;
  color: ${({ color }) => getColor(color)};
  margin-bottom: 3px;
  border: ${({ color }) => getBorder(color)};
`
const WrapperText = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`
const FirstLine = styled(WrapperText)`
  font-weight: bold;
`
const formatTime = value => {
  const valueNmb = parseInt(value, 10)

  if (valueNmb < 10) {
    return `0${valueNmb}`
  }

  return value
}

const Reminder = ({ reminder, ...rest }) => {
  const { text, hour, minute, city, color } = reminder
  return (
    <Wrapper color={color} {...rest}>
      <FirstLine>{text}</FirstLine>
      <WrapperText>{formatTime(hour)}:{formatTime(minute)} - {city}</WrapperText>
    </Wrapper>
  )
}

Reminder.propTypes = {
  reminder: PropTypes.object.isRequired
}

export {
  Reminder
}
