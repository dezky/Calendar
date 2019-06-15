import React from 'react'
import PropTypes from 'prop-types'

const Month = ({ month }) => {
  console.log(month)
  return <div>month</div>
}

Month.propTypes = {
  month: PropTypes.object.isRequired
}

export {
  Month
}
