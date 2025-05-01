import { useFavoritesStore } from '@/store'
import Product from '@/components/Product'

const Favorites = () => {
    const favoritesItems = useFavoritesStore((state) => state.items)
    return (
        <div className="max-container">
            <h1 className='text-3xl font-bold mt-20'>Favorites</h1>
            <div className="mt-5">
                {favoritesItems.length === 0 ? (
                    <p className='text-center'>You don't have favorite items</p>
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
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Favorites