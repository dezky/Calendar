import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

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

const ModalComp = ({ isOpen, children }) => {
  return (
    <Modal isOpen={isOpen} style={customStyles}>{children}</Modal>
  )
}

ModalComp.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export {
  ModalComp
}
