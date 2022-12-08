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



export const getFavoriteItems = () => {
  const isValid = typeof window !== 'undefined' && localStorage.getItem('favoriteItemsId') !== null

  if (isValid) {
    return JSON.parse(localStorage.getItem('favoriteItemsId')!) as number[]
  }
  return []
}

export const setFavoriteItem = (itemId: number) => {
  const isValid = typeof window !== 'undefined' && localStorage.getItem('favoriteItemsId') !== null

  if (isValid) {
    const currentItems = JSON.parse(localStorage.getItem('favoriteItemsId')!) as number[]

    if (currentItems.find(item => item === itemId) !== undefined) {
      // remove from id's array
      const newItems = currentItems
      newItems.splice(currentItems.indexOf(itemId), 1)
      localStorage.setItem('favoriteItemsId', JSON.stringify(newItems))
      return
    }
    const newItems = JSON.stringify([...currentItems, itemId])
    localStorage.setItem('favoriteItemsId', newItems)
    return
  }

  localStorage.setItem('favoriteItemsId', JSON.stringify([itemId]))
}
