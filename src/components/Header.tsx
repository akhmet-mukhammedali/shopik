import { Link, NavLink } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Heart, Search, ShoppingCart } from 'lucide-react'
import { useCartStore, useFavoritesStore, useSearchValue } from '@/store'
import { useState } from 'react'
import { delay, motion } from 'motion/react'

const Header = () => {
    const setValue = useSearchValue((state) => state.setValue)

    const [inputValue, setInputValue] = useState("")

    const handleSetValue = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        setValue(inputValue)
    }

    const cart = useCartStore((state) => state.items)

    const favoritesItems = useFavoritesStore((state) => state.items)
    return (
        <header className='py-5 fixed top-0 left-0 right-0 bg-background shadow-md z-50'>
            <div className="max-container">
                <nav className='flex items-center justify-between'>
                    <Link to="/" className='flex items-center gap-2'>
                        <motion.img initial={{ translateY: -100 }} animate={{ translateY: 1 }} transition={{ delay: 0.3 }} className='w-6' src="/logo.svg" alt="Logo" />
                        <span className='text-2xl font-bold'>Shopik</span>
                    </Link>
                    <ul>
                        <motion.li initial={{ translateX: -10 }} animate={{ translateX: 0 }}
                        whileHover={{ translateX: 2 }}  className='inline-block mx-4'>
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? 'underline' : ''}
                            >
                                Home
                            </NavLink>
                        </motion.li>
                        <motion.li initial={{ translateX: -10 }} animate={{ translateX: 0 }} transition={{ dalay: 0.2 }}
                        whileHover={{ translateX: 2 }}  className='inline-block mx-4'>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) => isActive ? 'underline' : ''}
                            >
                                Contact
                            </NavLink>
                        </motion.li>
                        <motion.li initial={{ translateX: -10 }} animate={{ translateX: 0 }} transition={{ dalay: 0.4 }}
                        whileHover={{ translateX: 2 }} className='inline-block mx-4'>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => isActive ? 'underline' : ''}
                            >
                                About
                            </NavLink>
                        </motion.li>
                        <motion.li initial={{ translateX: -10 }} animate={{ translateX: 0 }} transition={{ dalay: 0.6 }} whileHover={{ translateX: 2 }} className='inline-block mx-4'>
                            <NavLink
                                to="/sign-up"
                                className={({ isActive }) => isActive ? 'underline' : ''}
                            >
                                Sign Up
                            </NavLink>
                        </motion.li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <form onSubmit={handleSetValue} className="flex">
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type='submit' className='bg-primary text-white p-2 rounded-md ml-2 cursor-pointer'>
                                <Search size={20} />
                            </button>
                        </form>
                        <Link className='relative' to="/favorites">
                        <div className='text-[12px] absolute -right-2 -top-2 rounded-full bg-primary w-4 h-4 flex items-center justify-center'>{favoritesItems.length}</div>
                            <Heart size={20} className='' />
                        </Link>
                        <Link className='relative' to="/cart">
                            <div className='text-[12px] absolute -right-2 -top-2 rounded-full bg-primary w-4 h-4 flex items-center justify-center'>{cart.length}</div>
                            <ShoppingCart size={20} className='' />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header