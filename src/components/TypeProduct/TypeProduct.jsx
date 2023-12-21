import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TypeProductItem } from './style'

const TypeProduct = ({name}) => {
  const Navigate = useNavigate()
  const handleNavigatetype = (type) => {
    Navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
  }

  return (
    <TypeProductItem onClick={() => handleNavigatetype(name)}>{name}</TypeProductItem>
  )
}

export default TypeProduct
