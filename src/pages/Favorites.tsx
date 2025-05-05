import { useFavoritesStore } from '@/store'
import Product from '@/components/Product'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Favorites = () => {
    const favoritesItems = useFavoritesStore((state) => state.items)
    return (
        <div className="max-container">
            <h1 className='text-3xl font-bold mt-10'>Favorites</h1>
            <div className="mt-5 flex flex-col gap-2 items-center">
                {favoritesItems.length === 0 ? (
                    <>
                        <p className='text-center'>You don't have favorite items</p>
                        <Link className='flex items-center hover:underline' to="/">Go Shopping <ArrowRight size={20} /></Link>
                    </>
                ) : (
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {favoritesItems.map((item) => (
                            <Product 
                                key={item.id} 
                                id={item.id} 
                                title={item.title} 
                                image={item.image} 
                                price={item.price} 
                                isFavorite={item.isFavorite}
                                reviews={item.reviews}
                                rating={item.rating}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Favorites