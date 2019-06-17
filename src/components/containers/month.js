import React from 'react'
import { connect } from 'react-redux'

import { getMonth, addReminder } from 'actions'
import { Month as Presentation } from 'components/presentation'

class MonthContainer extends React.Component {

  componentDidMount() {
    this.props.getMonth(2, 2019)
  }

  render() {
    const { month, addReminder } = this.props

    return <Presentation month={month} addReminder={addReminder} />
  }
}

function mapStateToProps(state) {
  return {
    month: state.month
  }
}

const Month = connect(mapStateToProps, { getMonth, addReminder })(MonthContainer)

export {
  Month
}
