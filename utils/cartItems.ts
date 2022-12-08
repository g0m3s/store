
export const getCartItems = () => {
  const isValid = typeof window !== 'undefined' && localStorage.getItem('cartItems') !== null

  if (isValid) {
    return JSON.parse(localStorage.getItem('cartItems')!)
  }
  return []
}

export const setNewCartItems = (cartItem: any) => {
  const isValid = typeof window !== 'undefined' && localStorage.getItem('cartItems') !== null

  if (isValid) {
    const currentItems = JSON.parse(localStorage.getItem('cartItems')!)
    const newItems = JSON.stringify([...currentItems, cartItem])

    localStorage.setItem('cartItems', newItems)
    return
  }

  localStorage.setItem('cartItems', JSON.stringify([cartItem]))
}
