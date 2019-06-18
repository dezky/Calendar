import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chunk } from 'lodash'
import Modal from 'react-modal'

import { Day } from 'components/containers'
import { NewReminderComponent } from './newReminder'

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
  width: 200px;
  background-color: #2e73b4;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-right: 1px solid #2e73b4;
  border-left: ${({ position }) => getBorderLeftHeader(position)};
`
const Button = styled.button`
  margin: 5px 0;
  border-radius: 5px;
  padding: 10px 5px;
  border: none;
  color: #fff;
  background-color: #2e73b4;
  font-family: 'Montserrat', sans-serif;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

class Month extends React.Component {
  static propTypes = {
    month: PropTypes.object.isRequired,
    addReminder: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired,
    weatherConditions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      showNewReminder: false
    }
  }

  handleOpenModal = () => {
    this.setState({ showNewReminder: true });
  }

  handleCloseModal = () => {
    this.setState({ showNewReminder: false });
  }

  addReminderFn = (day, reminder) => {
    const { addReminder, weatherConditions, getWeather } = this.props

    if (reminder.zipCode && !weatherConditions[reminder.zipCode]) {
      getWeather(reminder.zipCode)
    }

    addReminder(day, reminder)
    this.handleCloseModal()
  }

  renderRowOfDays = (days, firstRow) => {
    return days.map((day, index) => {
      return <Day key={`day-${index}`} day={day} firstRow={firstRow}/>
    })
  }

  renderDays = days => {
    const rows = chunk(days, 7)
    return rows.map((row, index) => {
      const firstRow = index === 0
      return <Row key={`row-${index}`}>{this.renderRowOfDays(row, firstRow)}</Row>
    })
  }

  renderHeader = () => {
    return daysOfWeek.map((name, index) => {
      return <HeaderItem key={`header-${index}`} position={index}>{name}</HeaderItem>
    })
  }

  render() {
    const { name, days } = this.props.month
    const reminderProps = {
      cancelCallback: this.handleCloseModal,
      okCallback: this.addReminderFn
    }

    if (!days) {
      return null
    }

    return (
      <Wrapper>
        <h1>{name}</h1>
        <Button onClick={this.handleOpenModal}>New reminder</Button>
        <Modal
          isOpen={this.state.showNewReminder}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <NewReminderComponent {...reminderProps} />
        </Modal>
        <Row>{this.renderHeader()}</Row>
        {this.renderDays(days)}
      </Wrapper>
    )
  }
}

export {
  Month
}
