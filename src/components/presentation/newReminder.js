import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'

const Wrapper = styled.div`

`
const Title = styled.h1`
  text-align: center;
`
const Row = styled.div`
  margin: 10px;
  font-size: 1.5rem;
`
const RowButton = styled(Row)`
  text-align: center;
`
const Label = styled.label`
  margin-right: 5px
`
const Input = styled.input`
  border: 1px solid #B3A2A2;
  padding: 10px 5px;
  border-radius: 5px;
  font-size: 1.2rem;
`
const Error = styled.p`
  margin: 0;
  color: #f00;
  display: ${({ show }) => show ? 'block' : 'none'};
`
const Button = styled.button`
  margin: 5px 0;
  border-radius: 5px;
  padding: 10px 5px;
  border: none;
  color: #fff;
  background-color: #2e73b4;
  outline: none;
  width: 90px;
  font-size: 1.3rem;
  margin: 5px;

  &:hover {
    cursor: pointer;
  }
`

class NewReminderComponent extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    reminder: PropTypes.object,
    okCallback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func
  }

  static defaultProps = {
    day: 0,
    reminder: {},
    deleteCallback: () => {}
  }

  constructor(props) {
    super(props)

    const { hour, minute, text, city, color } = props.reminder
    this.state = {
      day: props.day,
      hour: hour ? hour : 0,
      minute: minute ? minute : 0,
      text: text ? text : '',
      city: city ? city : '',
      color: color ? color : '',
      error: {
        day: false,
        hour: false,
        minute: false,
        text: false
      }
    }
  }

  checkErrors = () => {
    const { day, hour, minute, text } = this.state
    const error = {}

    if (!day || day > 31 || day < 1) {
      error.day = true
    } else {
      error.day = false
    }

    if (hour.length === 0 || hour < 0 || hour > 23) {
      error.hour = true
    } else {
      error.day = false
    }

    if (minute.length === 0 || minute < 0 || minute > 59) {
      error.minute = true
    } else {
      error.minute = false
    }

    if (text.length > 30) {
      error.text = true
    } else {
      error.text = false
    }

    this.setState({error})

  }

  onChangeDay = evt => {
    this.setState({day : evt.target.value }, () => {
      this.checkErrors()
    })
  }

  onChangeHour = evt => {
    this.setState({ hour: evt.target.value })
  }

  onChangeMinute = evt => {
    this.setState({ minute: evt.target.value })
  }

  onChangeText = evt => {
    this.setState({ text: evt.target.value })
  }

  onChangeCity = evt => {
    this.setState({ city: evt.target.value })
  }

  onChangeColor = color => {
    this.setState({ color: color.hex })
  }

  onClickOkButton = () => {
    const { okCallback } = this.props
    const { day, error, ...reminder } = this.state

    okCallback(parseInt(day, 10), reminder)
  }

  render() {
    const { cancelCallback, reminder } = this.props
    const { day, hour, minute, text, city, color, error } = this.state
    const title = reminder.id ? 'Edit reminder' : 'New Reminder'

    return (
      <Wrapper>
        <Title>{title}</Title>
        <Row>
          <Label htmlFor='day'>Day:</Label>
          <Input id= 'day' type='number' value={day} onChange={ this.onChangeDay } min={1} max={31}/>
          <Error show={error.day}>Incorrect day</Error>
        </Row>
        <Row>
          <Label htmlFor='hour'>Time:</Label>
          <Input id='hour' type='number' value={hour} onChange={ this.onChangeHour } min={0} max={23}/>
          <span> : </span>
          <Input type='number' value={minute} onChange={ this.onChangeMinute } min={0} max={59}/>
          <Error show={error.hour}>Incorrect hour</Error>
          <Error show={error.minute}>Incorrect minute</Error>
        </Row>
        <Row>
          <Label htmlFor='text'>Text:</Label>
          <Input id='text' type='text' value={text} onChange={ this.onChangeText } maxLength={30}/>
          <Error show={error.text}>Max lenght 30 chars</Error>
        </Row>
        <Row>
          <Label htmlFor='city'>City:</Label>
          <Input id='city' type='text' value={city} onChange={ this.onChangeCity }/>
        </Row>
        <Row>
          <SketchPicker
            color={color}
            onChangeComplete={ this.onChangeColor }
          />
        </Row>
        <RowButton>
          <Button onClick={this.onClickOkButton}>Add</Button>
          <Button onClick={cancelCallback}>Cancel</Button>
        </RowButton>
      </Wrapper>
    )
  }
}

export {
  NewReminderComponent
}
