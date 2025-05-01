import { useCartStore } from '@/store'
import Product from '@/components/Product'

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
                            <Product 
                                key={item.id} 
                                id={item.id} 
                                title={item.title} 
                                image={item.image} 
                                price={item.price} 
                                rating={item.rating}
                                quantity={item.quantity ?? 0}
                                isFavorite={item.isFavorite}
                                reviews={item.reviews}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Cart