import React from 'react'
import { Card } from './ui/card'
import { useCartStore } from '@/store'

const CartProduct = (cartProduct: {
    id: number
    title: string
    image: string
    price: number,
    quantity: number
}) => {
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  return (
    <Card>
        
        <div className="flex flex-col justify-between rounded-2xl gap-0 p-0">
            <img src={cartProduct.image} alt={cartProduct.title} className='rounded-[10px] h-[241px] w-[241px] m-6' />
            <div className="flex flex-col">
                <h2>{cartProduct.title}</h2>
                <div className='flex items-center justify-between'>
                    <button onClick={() => increaseQuantity(cartProduct.id)}>+</button>
                    <span>{cartProduct.quantity}</span>
                    <button disabled={cartProduct.quantity === 0} onClick={() => decreaseQuantity(cartProduct.id)}>-</button>
                </div>
            </div>
        </div>
    </Card>
  )
}

export default CartProduct