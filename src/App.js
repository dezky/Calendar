import React from 'react'
import { createGlobalStyle } from 'styled-components'

import { Month } from 'components/containers'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
  }
`

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Month />
    </React.Fragment>
  )
}

export default App;
