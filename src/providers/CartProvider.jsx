import {
    createContext,
    useState,
    useEffect,
    useContext
} from 'react';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({})

    const addToCart = (productName) => {
        if(!cart[productName]) {
            setCart(cart => ({ ...cart, [productName]: 1 }))
        } else {
            setCart(cart => ({ ...cart, [productName]: cart[productName] + 1 }))
        }
    }

    const removeFromCart = (productName) => {
        if(cart[productName] === 1) {
            const newCart = { ...cart }
            delete newCart[productName]
            setCart(newCart)
        } else {
            setCart(cart => ({ ...cart, [productName]: cart[productName] - 1 }))
        }
    }

    const removeProductFromCart = (productName) => {
        const newCart = { ...cart }
        delete newCart[productName]
        setCart(newCart)
    }

    const totalItems = Object.values(cart).reduce((acc, item) => acc + item, 0)

    useEffect(() => {
        try {
            const cartData = localStorage.getItem('cart')
            if (cartData) {
                setCart(JSON.parse(cartData))
            }
        } catch (error) {
            console.error('Error al cargar datos del carrito desde localStorage:', error)
        }
    }, [])
    
    useEffect(() => {
        if (Object.keys(cart).length > 0) {
            try {
                localStorage.setItem('cart', JSON.stringify(cart))
            } catch (error) {
                console.error('Error al guardar datos del carrito en localStorage:', error)
            }
        }
    }, [cart])
    

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, removeProductFromCart }}>
            {children}
        </CartContext.Provider>
    )
}
    
export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}