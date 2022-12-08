import { Product } from "./mockedData"

export interface CartItem extends Product {
  amount: number
  selectedSize?: string
  selectedColor?: string
}

export const getCartItems = () => {
  const isValid = typeof window !== 'undefined' && localStorage.getItem('cartItems') !== null

  if (isValid) {
    return JSON.parse(localStorage.getItem('cartItems')!) as CartItem[]
  }
  return []
}

export const setNewCartItem = (cartItem: CartItem) => {
  const isValid = typeof window !== 'undefined' && localStorage.getItem('cartItems') !== null

  if (isValid) {
    const currentItems = JSON.parse(localStorage.getItem('cartItems')!)
    const newItems = JSON.stringify([...currentItems, cartItem])

    localStorage.setItem('cartItems', newItems)
    return
  }

  localStorage.setItem('cartItems', JSON.stringify([cartItem]))
}

export const setNewCartItems = (cartItems: CartItem[]) => {
  const isValid = typeof window !== 'undefined' && localStorage.getItem('cartItems') !== null

  if (isValid) {
    const newItems = JSON.stringify(cartItems)

    localStorage.setItem('cartItems', newItems)
    return
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
