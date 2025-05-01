import { useCartStore } from '@/store'

const Counter = (product: {
    id: number
    quantity: number
}) => {
    const cart = useCartStore((state) => state.items)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeFromCart = useCartStore((state => state.removeFromCart));

    const handleDescrease = () => {
        if (quantity === 1) {
            removeFromCart(product.id)
        } else {
            decreaseQuantity(product.id)
        }
    }

    const quantity = cart.find((item) => item.id === product.id)?.quantity

    return (
        <div className='flex items-center justify-center gap-4 w-full bg-primary'>
            <button className=' cursor-pointer px-2 bg-red-200 rounded-[10px] text-primary font-black' onClick={() => increaseQuantity(product.id)}>+</button>
            <span>{quantity ? (typeof quantity === 'number' ? quantity : 1) : 1}</span>
            <button className=' cursor-pointer px-2 bg-red-200 rounded-[10px] text-primary font-black' onClick={handleDescrease}>-</button>
        </div>
    )
}

export default Counter