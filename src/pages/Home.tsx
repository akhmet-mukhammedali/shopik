import Product from '@/components/Product'
import ProductSkeleton from '@/components/ProductSkeleton'
import { useSearchValue } from '@/store'
import { ProductType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"

export const fetchProducts = async (value: string) => {
    const response = await fetch('https://dummyjson.com/products')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()

    const filteredProducts = data.products.filter((product: ProductType) => {
        return product.title.toLowerCase().includes(value.toLowerCase())
    })

    return filteredProducts;
}

const Home = () => {

    const value = useSearchValue((state) => state.value)

    const { data, isLoading } = useQuery<ProductType[]>({
        queryKey: ['products', value],
        queryFn: () => fetchProducts(value),
    })

    return (
        <div className='max-container py-10'>
                {isLoading ? (
                    <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {Array.from({ length: 12 }, (_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </ul>
                ) : (
                    data?.length ? (
                        <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {
                                data?.map((product: any) => (
                                    <Product key={product.id} id={product.id} title={product.title} image={product.images[0]} rating={product.rating} price={product.price} isFavorite={false} reviews={product.reviews}  />
                                ))
                            }
                        </ul>
                    ) : (
                        <div className='flex flex-col gap-3 items-center w-full'>
                            <h1 className='font-bold text-5xl'>Oops...</h1>
                            <p>Try search something else</p>
                        </div>
                    )
                )}
            <Toaster />
        </div >
    )
}

export default Home