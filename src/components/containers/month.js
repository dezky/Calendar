import React from 'react'
import { connect } from 'react-redux'

import { getMonth, addReminder, getWeather } from 'actions'
import { Month as Presentation } from 'components/presentation'

class MonthContainer extends React.Component {

  componentDidMount() {
    this.props.getMonth(2, 2019)
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
