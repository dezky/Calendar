import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateReminder, deleteReminder } from 'actions'
import { Day as Presentation } from 'components/presentation'

class DayContainer extends React.Component {
  static propTypes = {
    firstRow: PropTypes.bool,
    day: PropTypes.object.isRequired
  }

  static defaultProps = {
    firstRow: false
  }

  render() {
    return <Presentation {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    month: state.month
  }
}

const Day = connect(mapStateToProps, { updateReminder, deleteReminder })(DayContainer)

export {
  Day
}
