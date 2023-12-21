import { Steps} from 'antd'
import React from 'react'
import { CustomStep } from './styled';
const StepComponent = ({current = 0, items = []}) => {
  return (
    <Steps current={current}>
    {items.map((item) => {
      return (
        <CustomStep key={item.title} title={item.title} 
                    description={item.description} 
                    style={{fontFamily:'Signika Negative'}}/>
      )
    })}
  </Steps>
  )
}

export default StepComponent