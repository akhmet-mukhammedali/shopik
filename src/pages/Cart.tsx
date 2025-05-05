import { useCartStore } from '@/store'
import Product from '@/components/Product'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Cart = () => {
    const cart = useCartStore((state) => state.items)
    return (
        <div className="max-container">
            <h1 className='text-3xl font-bold mt-10'>Cart</h1>
            <div className="mt-5 flex flex-col items-center gap-2">
                {cart.length === 0 ? (
                    <>
                        <p className='text-center'>Your cart is empty.</p>
                        <Link className='flex items-center hover:underline' to="/">Go Shopping <ArrowRight size={20} /></Link>
                    </>
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