import { useCartStore, useFavoritesStore } from "@/store"
import { ProductType } from "@/types"
import { Heart } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Counter from "./Counter"
import { motion } from "framer-motion"

const generateStars = (rating: number) => {
    const stars = []
    let numbersLeft = rating
    while (numbersLeft > 0) {
        if (numbersLeft >= 1) {
            stars.push(<motion.img animate={{ rotate: 90 }} key={Math.random()} className="w-4" src="/star-gold.svg" />);
            numbersLeft -= 1;
        } else if (numbersLeft === 0.5) {
            stars.push(<motion.img animate={{ rotate: 90 }} key={Math.random()} className="w-[15px]" src="/star-half.svg" />);
            numbersLeft = 0;
        }
    }

    let grayStars = 5 - rating

    while (grayStars !== 0) {
        if (grayStars === 0.5) {
            grayStars -= 0.5
        } else {
            stars.push(<img key={Math.random()} className="w-4" src="/star-gray.svg" />)
            grayStars -= 1
        }
    }

    return stars;
}

const Product = (product: ProductType) => {
    const [hovered, setHovered] = useState(false)
    const cart = useCartStore((state => state.items));
    const addToCart = useCartStore((state => state.addToCart));
    const removeFromCart = useCartStore((state => state.removeFromCart));
    const favoritesItems = useFavoritesStore((state) => state.items)
    const toggleFavorites = useFavoritesStore((state) => state.toggleFavorites)

    if (product.quantity === 0) {
        removeFromCart(product.id)
    }

    return (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2}} className={`flex flex-col gap-4 overflow-hidden duration-100 ${hovered && "opacity-85"}`} onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="relative bg-[#1a1a1a] rounded-[7px] flex flex-col items-center justify-center overflow-hidden">
                {favoritesItems.some((item) => item.id === product.id) ?
                    <button className="absolute top-6 right-6 cursor-pointer z-20" onClick={() => { toggleFavorites(product), toast(`${product.title} was removed from favorites`) }}>
                        <Heart className="text-primary fill-primary" />
                    </button> :
                    <button className="absolute top-6 right-6 cursor-pointer z-20" onClick={() => { toggleFavorites(product), toast(`${product.title} was added to favorites`) }}>
                        <Heart className="text-text" />
                    </button>
                }
                <img className="w-[206px] h-[206px]" src={product.image} alt={product.title} />
                {
                    cart.some((item) => item.id === product.id) ?
                        (<div className="w-full bg-primary text-white py-2 absolute left-0 right-0 bottom-0">
                            <Counter id={product.id} quantity={product.quantity ?? 1} title={product.title} />
                        </div>) : (
                            <div className={`w-full bg-primary text-white py-2 absolute left-0 right-0 duration-100 ${hovered ? "bottom-0" : "-bottom-10"}`}>
                                <button className="w-full cursor-pointer" onClick={() => {
                                    addToCart(product),
                                    toast(`${product.title} was added to the cart`)
                                } }>Add to cart</button>
                            </div>
                        )
                }
            </div>
            <div className="flex flex-col gap-2 justify-baseline">
                <h3 className="text-white text-[16px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{product.title}</h3>
                <div className="flex gap-4 items-center">
                    <p className="text-red-400 text-[14px] font-medium">${product.price}</p>
                    <div className="flex items-center gap-0.5">
                        {product.rating !== undefined ? generateStars(Math.round(product.rating * 2) / 2) : null}
                        <p className="text-gray-400 ml-1">({product.reviews.length})</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Product