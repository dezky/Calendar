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

  &:hover {
    cursor: pointer;
  }
`
const WrapperText = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`
const FirstLine = styled(WrapperText)`
  font-weight: bold;
`
const Weather = styled.img`
  float: right;
`
const formatTime = value => {
  const valueNmb = parseInt(value, 10)

  if (valueNmb < 10) {
    return `0${valueNmb}`
  }

  return value
}

const Reminder = ({ reminder, icon, ...rest }) => {
  const { text, hour, minute, city, color } = reminder
  return (
    <Wrapper color={color} {...rest}>
      {icon && <Weather src={`http://openweathermap.org/img/w/${icon}.png`} alt="time" height="42" width="42" />}
      <FirstLine>{text}</FirstLine>
      <WrapperText>{formatTime(hour)}:{formatTime(minute)} - {city}</WrapperText>
    </Wrapper>
  )
}

Reminder.propTypes = {
  reminder: PropTypes.object.isRequired,
  icon: PropTypes.string
}

Reminder.defaultProps = {
  icon: ''
}

export {
  Reminder
}
