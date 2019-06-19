import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CompactPicker } from 'react-color'

import { ModalComp } from './modal'
import { Confirm } from './confirm'

const Wrapper = styled.div`
  min-width: 380px;
  .flexbox-fix {
    display: none !important;
  }
`
const Title = styled.h1`
  text-align: center;
`
const Row = styled.div`
  margin: 10px;
  font-size: 1.5rem;
`
const RowExpanded = styled(Row)`
  display: flex;
  align-items: center;
`
const RowButton = styled(Row)`
  text-align: center;
`
const Label = styled.label`
  margin-right: 5px;
  display: inline-block;
  width: 100px;
`
const Input = styled.input`
  border: 1px solid #B3A2A2;
  padding: 10px 5px;
  border-radius: 5px;
  font-size: 1.2rem;
  outline: none;
`
const Error = styled.p`
  color: #dc3545;
  font-size: 0.8rem;
  display: ${({ show }) => show ? 'block' : 'none'}
`
const Button = styled.button`
  border-radius: 5px;
  padding: 10px 5px;
  border: none;
  color: #fff;
  background-color: #2e73b4;
  font-family: 'Montserrat', sans-serif;
  outline: none;
  width: 90px;
  font-size: 1.3rem;
  margin: 5px;

  &:disabled {
    opacity: 0.5;
    &:hover {
      cursor: not-allowed;
    }
  }

  &:hover {
    cursor: pointer;
  }
`

const DeleteButton = styled(Button)`
  background-color: #dc3545;
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
    day: 1,
    reminder: {},
    deleteCallback: () => {}
  }

  constructor(props) {
    super(props)

    const { hour, minute, text, city, color, id, country } = props.reminder
    this.state = {
      day: props.day,
      id: id ? id : 0,
      hour: hour ? hour : 0,
      minute: minute ? minute : 0,
      text: text ? text : '',
      city: city ? city : '',
      color: color ? color : '',
      country: country ? country : '',
      error: {
        day: props.day < 1 || props.day > 31 ? true : false,
        hour: false,
        minute: false,
        text: false,
      },
      touched: {
        day: false,
        hour: false,
        minute: false,
        text: false,
      },
      showConfirmModal: false
    }
  }

  handleOpenConfirmModal = reminder => {
    this.setState({ showConfirmModal: true });
  }

  handleCloseConfirmModal = () => {
    this.setState({ showConfirmModal: false });
  }

  onFocusDay = () => {
    const { touched } = this.state

    touched.day = true;
    this.setState({ touched })
  }

  onFocusHour = () => {
    const { touched } = this.state

    touched.hour = true;
    this.setState({ touched })
  }

  onFocusMinute = () => {
    const { touched } = this.state

    touched.minute = true;
    this.setState({ touched })
  }

  onFocusText = () => {
    const { touched } = this.state

    touched.text = true;
    this.setState({ touched })
  }

  onChangeDay = evt => {
    this.setState({day : evt.target.value }, () => {
      this.checkErrors()
    })
  }

  onChangeHour = evt => {
    this.setState({ hour: evt.target.value }, () => {
      this.checkErrors()
    })
  }

  onChangeMinute = evt => {
    this.setState({ minute: evt.target.value }, () => {
      this.checkErrors()
    })
  }

  onChangeText = evt => {
    this.setState({ text: evt.target.value }, () => {
      this.checkErrors()
    })
  }

  onChangeCity = evt => {
    this.setState({ city: evt.target.value })
  }

  onChangeCountry = evt => {
    this.setState({ country: evt.target.value })
  }

  onChangeColor = color => {
    this.setState({ color: color.hex })
  }

  onClickOkButton = () => {
    const { okCallback } = this.props
    const { day, error, touched, ...reminder } = this.state

    if (reminder.id === 0) {
      reminder.id = Date.now()
    }

    if (!reminder.country) {
      reminder.country = 'US'
    }

    okCallback(parseInt(day, 10), reminder)
  }

  deleteReminder = () => {
    const { deleteCallback } = this.props

    deleteCallback(this.state.id)
    this.handleCloseConfirmModal()
  }

  checkErrors = () => {
    const { day, hour, minute, text, error } = this.state

    error.day = day > 31 || day < 1
    error.hour = hour > 23 || hour < 0
    error.minute = minute > 59 || minute < 0
    error.text = text.length > 30

    this.setState({ error })
  }

  hasErrors = () => {
    const { day, hour, minute, text } = this.state.error

    return day || hour || minute || text
  }

  render() {
    const { cancelCallback, reminder } = this.props
    const { day, hour, minute, text, city, color, country, showConfirmModal, error, touched } = this.state
    const title = reminder.id > 0 ? 'Edit reminder' : 'New Reminder'
    const showDeleteButton = reminder.id > 0
    const confirmProps = {
      message: 'Are you sure to delete the reminder?',
      okCallback: this.deleteReminder,
      cancelCallback: this.handleCloseConfirmModal
    }

    return (
      <Wrapper>
        <Title>{title}</Title>
        <Row>
          <Label htmlFor='day'>Day:</Label>
          <Input id= 'day' type='number' value={day} onChange={ this.onChangeDay } onFocus={this.onFocusDay} min={1} max={31}/>
          <Error show={error.day && touched.day}>Day should be between 1 and 31</Error>
        </Row>
        <Row>
          <Label htmlFor='hour'>Time:</Label>
          <Input id='hour' type='number' value={hour} onChange={ this.onChangeHour } onFocus={this.onFocusHour} min={0} max={23}/>
          <span> : </span>
          <Input type='number' value={minute} onChange={ this.onChangeMinute } onFocus={this.onFocusMinute} min={0} max={59}/>
          <Error show={error.hour && touched.hour}>Incorrect hour</Error>
          <Error show={error.minute && touched.minute}>Incorrect minute</Error>
        </Row>
        <RowExpanded>
          <Label htmlFor='text'>Text:</Label>
          <Input id='text' type='text' value={text} onChange={ this.onChangeText } onFocus={this.onFocusText} maxLength={30} style={{ flexGrow: 1}}/>
          <Error show={error.text && touched.text}>Incorrect text, should be less than 30 chars</Error>
        </RowExpanded>
        <RowExpanded>
          <Label htmlFor='city'>City:</Label>
          <Input id='city' type='text' value={city} onChange={ this.onChangeCity } style={{ flexGrow: 1}}/>
        </RowExpanded>
        <RowExpanded>
          <Label htmlFor='country'>Country:</Label>
          <Input id= 'country' type='text' value={country} onChange={ this.onChangeCountry } style={{ flexGrow: 1}} placeholder='Ex. US'/>
        </RowExpanded>
        <Row style={{textAlign: 'center'}}>
          <CompactPicker
            color={color}
            onChangeComplete={ this.onChangeColor }
          />
        </Row>
        <ModalComp isOpen={showConfirmModal}><Confirm {...confirmProps} /></ModalComp>
        <RowButton>
          <Button onClick={this.onClickOkButton} disabled={this.hasErrors()}>Save</Button>
          { showDeleteButton && <DeleteButton onClick={this.handleOpenConfirmModal}>Delete</DeleteButton>}
          <Button onClick={cancelCallback}>Cancel</Button>
        </RowButton>
      </Wrapper>
    )
  }
}

export {
  NewReminderComponent
}
