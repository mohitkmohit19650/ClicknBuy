import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState(() => {

        // Load the cart from session Storage on mount
        const storedCart = sessionStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    // save cart to session storage whenever it change
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cartItem))
    }, [cartItem])


    const addToCart = (addNewProduct) => {
        const itemInCart = cartItem.find((item) => item.id === addNewProduct.id)
        if (itemInCart) {
            // increase quantity if item already in cart
            const updatedcart = cartItem.map((item) =>
                item.id === addNewProduct.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItem(updatedcart)
            toast.success('Product Quantity Successfully Increased!')
        } else {
            // add new item with quantity
            setCartItem((prev) => [...prev, { ...addNewProduct, quantity: 1 }])
            toast.success("Product Added to Cart!")
        }
    }

    const updateQuantity = (cartItem, productId, action) => {
        setCartItem(
            cartItem.map((item) => {
                if (item.id === productId) {
                    let newUnit = item.quantity;
                    if (action === "increase") {
                        newUnit = newUnit + 1
                        toast.success('Product Quantity Successfully Increased!')
                    } else if (action === "decrease") {
                        newUnit = newUnit - 1
                        toast.warn('Product Quantity Successfully Decreased!')
                    }
                    return newUnit > 0 ? { ...item, quantity: newUnit } : null
                }
                return item;
            })
                .filter((item) => item != null)//removed the item of quantity 0
        )
    }
const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item)=> item.id != productId))
    toast.success('Product Deleted Successfully!')
}


    const value = useMemo(() => {
        return { cartItem, setCartItem, addToCart, updateQuantity, deleteItem }
    }, [cartItem])
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
export const useCartHook = () => useContext(CartContext);
