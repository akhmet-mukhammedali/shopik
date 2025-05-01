import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useCartStore, useFavoritesStore } from "@/store"
import { ProductType } from "@/types"
import { Dot, Heart, Star, StarIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"



const Product = (product: ProductType) => {
    const [hovered, setHovered] = useState(false)
    const cart = useCartStore((state => state.items));
    const addToCart = useCartStore((state => state.addToCart));
    const favoritesItems = useFavoritesStore((state) => state.items)
    const toggleFavorites = useFavoritesStore((state) => state.toggleFavorites)

    return (
        <Card onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="w-full h-full flex flex-col justify-between rounded-2xl relative">
            {favoritesItems.some((item) => item.id === product.id) ?
                <button onClick={() => {toggleFavorites(product), toast("The item was removed from favorites")}}>
                    <Heart fill="red"/>
                </button> :
                <button onClick={() => {toggleFavorites(product), toast("The item was added to favorites")}}>
                    <Heart />
                </button>
            }
            {hovered && <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/50 rounded-[10px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
                {cart.some((item) => item.id === product.id) 
                    ? <p className="text-white">Added to Cart</p> 
                    : <p className="text-white">Add to Cart</p>}
                <button onClick={() => {addToCart(product), toast("The item was added to the cart")}} className="bg-primary text-white p-2 rounded-lg cursor-pointer">Add to Cart</button>
            </div>}
            
            <CardHeader>
                <img className="rounded-[10px] h-[241px] w-[241px]" src={product.image} alt="" />
                <CardTitle className="text-2xl">{product.title}</CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                    {<StarIcon size={20} className='text-yellow-500' />}
                    <span>{product.rating?.toFixed(2)}</span>
                </div>
                <span>
                    {<Dot size={30} />}
                </span>
                <div>
                    <p className="font-medium">${product.price}</p>
                </div>
            </CardFooter>
        </Card>
    )
}

export default Product