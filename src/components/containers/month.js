import React from 'react'
import { connect } from 'react-redux'

import { getMonth } from 'actions'
import { Month as Presentation } from 'components/presentation'

class MonthContainer extends React.Component {

  componentDidMount() {
    this.props.getMonth(2, 2019)
  }

  render() {
    const { month } = this.props

    return <Presentation month={month} />
  }
}

function mapStateToProps(state) {
  return {
    month: state.month
  }
}

const Month = connect(mapStateToProps, { getMonth })(MonthContainer)

export {
  Month
}
