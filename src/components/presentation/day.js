import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-modal'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { Reminder } from './reminder'
import { NewReminderComponent } from './newReminder'


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
const TrashButton = styled(FontAwesomeIcon)`
  float: right;
  margin: 5px 5px;

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

class Day extends React.Component {
  static propTypes = {
    firstRow: PropTypes.bool,
    day: PropTypes.object.isRequired,
    updateReminder: PropTypes.func.isRequired,
    deleteReminder: PropTypes.func.isRequired,
    deleteAllReminders: PropTypes.func.isRequired,
    weatherConditions: PropTypes.object.isRequired,
    getWeather: PropTypes.func.isRequired
  }

  static defaultProps = {
    firstRow: false
  }

  constructor(props) {
    super(props)

    this.state = {
      showNewReminder: false,
      selectedReminder: {}
    }
  }

  handleOpenModal = reminder => {
    this.setState({ selectedReminder: reminder, showNewReminder: true });
  }

  handleCloseModal = () => {
    this.setState({ showNewReminder: false, selectedReminder: {} });
  }

  updateReminderFn = (newday, reminder) => {
    const { updateReminder, day, weatherConditions, getWeather } = this.props

    if (reminder.zipCode && !weatherConditions[reminder.zipCode]) {
      getWeather(reminder.zipCode)
    }

    updateReminder(newday, day.index, reminder)
    this.handleCloseModal()
  }

  deleteReminderFn = id => {
    const { deleteReminder, day } = this.props

    deleteReminder(day.index, id)
    this.handleCloseModal()
  }

  deleteAllRemindersFn = () => {
    const { deleteAllReminders, day } = this.props

    deleteAllReminders(day.index)
    this.handleCloseModal()
  }

  getIcon = (zipCode, hour) => {
    const { weatherConditions, day } = this.props
    const today = moment()
    const dayMom = moment().hour(hour).date(day.number)
    const diffDay = dayMom.diff(today, 'days')
    let icon = ''

    if (diffDay >= 0 && diffDay <= 5 && weatherConditions[zipCode]) {
      weatherConditions[zipCode].some(data => {
        if (dayMom.diff(moment(data.dt)) >= 0) {
          icon = data.icon
          return true
        }

        return false
      })
    }

    return icon
  }

  renderReminders = reminders => {
    return reminders.map(reminder => {
      const onClick = () => this.handleOpenModal(reminder)
      const icon = this.getIcon(reminder.zipCode, reminder.hour)

      return <Reminder key={reminder.id} reminder={reminder} onClick={onClick} icon={icon}/>
    })
  }

  render() {
    const { day, firstRow } = this.props
    const { dayOfWeek, number, reminders } = day
    const { selectedReminder } = this.state
    const reminderProps = {
      day: number,
      cancelCallback: this.handleCloseModal,
      okCallback: this.updateReminderFn,
      reminder: selectedReminder,
      deleteCallback: this.deleteReminderFn
    }

    return (
      <Wrapper dayOfWeek={dayOfWeek} firstRow={firstRow}>
        {reminders.length > 0 && <TrashButton icon={faTrashAlt} onClick={this.deleteAllRemindersFn} />}
        <Number>{number}</Number>
        <WrapperReminders>{this.renderReminders(reminders)}</WrapperReminders>
        <Modal
          isOpen={this.state.showNewReminder}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <NewReminderComponent {...reminderProps} />
        </Modal>
      </Wrapper>
    )
  }
}

export {
  Day
}
