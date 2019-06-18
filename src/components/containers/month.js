import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { getMonth, addReminder, getWeather } from 'actions'
import { Month as Presentation } from 'components/presentation'

class MonthContainer extends React.Component {

  componentDidMount() {
    const today = moment()
    this.props.getMonth(today.month(), today.year())
  }

  render() {
    const { getMonth, ...rest } = this.props

    return <Presentation {...rest} />
  }
}

function mapStateToProps(state) {
  return {
    month: state.month,
    weatherConditions: state.weather
  }
}

const Month = connect(mapStateToProps, { getMonth, addReminder, getWeather })(MonthContainer)

export {
  Month
}
