import React from 'react'
import Button from '../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseQuantity, increaseQuantity } from './cartSlice'

const UpdateItemQuantity = ({pizzaId, currentQuantity}) => {
    const dispatch = useDispatch()

    return (
        <div className='flex gap-1 items-center md:gap-2'>
            <Button onClick={() => dispatch(decreaseQuantity(pizzaId))} type="round">-</Button>
            <p>{currentQuantity}</p>
            <Button onClick={() => dispatch(increaseQuantity(pizzaId))} type="round">+</Button>
        </div>
    )
}

export default UpdateItemQuantity