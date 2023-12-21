import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'

const DefaultComponent = ({children}) => {
  return (
    <div>
      <div>
        <HeaderComponent/>
        {children}
        <FooterComponent/>
      </div>
    </div>
  )
}

export default DefaultComponent
