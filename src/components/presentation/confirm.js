import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const MessageWrapper = styled.p`
  font-size: 1.7rem;
`
const Row = styled.div`
  margin: 10px;
  text-align: center;
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

  &:hover {
    cursor: pointer;
  }
`

const CancelButton = styled(Button)`
  background-color: #dc3545;
`

const Confirm = ({ message, okCallback, cancelCallback }) => {
  return (
    <div>
      <MessageWrapper>{message}</MessageWrapper>
      <Row>
        <Button onClick={okCallback}>Ok</Button>
        <CancelButton onClick={cancelCallback}>Cancel</CancelButton>
      </Row>
    </div>
  )
}

Confirm.propTypes = {
  message: PropTypes.string.isRequired,
  okCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired
}

export {
  Confirm
}
