import { useCartStore } from '@/store'
import CartProduct from '@/components/CartProduct'

const Cart = () => {
    const cart = useCartStore((state) => state.items)
    return (
        <div className="max-container">
            <h1 className='text-3xl font-bold mt-20'>Cart</h1>
            <div className="mt-5">
                {cart.length === 0 ? (
                    <p className='text-center'>Your cart is empty.</p>
                ) : (
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {cart.map((item) => (
                            <CartProduct 
                                key={item.id} 
                                id={item.id} 
                                title={item.title} 
                                image={item.image} 
                                price={item.price} 
                                quantity={item.quantity ?? 0}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Cart