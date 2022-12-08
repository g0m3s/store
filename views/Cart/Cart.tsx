/* eslint-disable @next/next/no-img-element */
import { SellOutlined } from '@mui/icons-material';
import { CartItem, getCartItems, setNewCartItems } from '../../utils/cartItems';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const increaseAmount = (productId: number) => {
    const updatedProducts = cartItems.map(product => {
      return product.id == productId ? {
        ...product,
        amount: product.amount + 1
      } : product
    })
    setNewCartItems(updatedProducts)
    setCartItems(updatedProducts)
  }

  const decreaseAmount = (productId: number) => {
    const updatedProducts = cartItems.map(product => {
      return product.id == productId ? {
        ...product,
        amount: product.amount - 1 < 0 ? 0 : product.amount - 1
      } : product
    })
    setNewCartItems(updatedProducts)
    setCartItems(updatedProducts)
  }

  const totalItemsValue = useMemo(() => {
    let total = 0
    cartItems.map(product => {
      total = total + (product.amount * product.price)
    })
    return total
  }, [cartItems])

  useEffect(() => {
    setCartItems(getCartItems())
  }, [])

  return (
    <Stack height='calc(100vh -48px)'>
      <Stack mt={2} width='100%' direction='row' alignItems='center' justifyContent='space-between'>
        <Typography textAlign='center' variant='h4'><b>Seus produtos</b></Typography>
        <SellOutlined />
      </Stack>
      {cartItems.length > 0 && cartItems.map((cartItem) => (
        <Stack
          py={1}
          px={1.5}
          mt={1.5}
          color='black'
          direction='row'
          bgcolor='white'
          borderRadius={2}
          key={cartItem.id}
          position='relative'
          alignItems='center'
          justifyContent='space-between'
          border='1px solid rgba(0,0,0,.1)'
          sx={{
            cursor: 'pointer',
            ':before': {
              top: -3,
              left: 0,
              right: 0,
              zIndex: -1,
              opacity: .8,
              content: '""',
              width: '100%',
              height: '110%',
              filter: 'blur(6px)',
              position: 'absolute',
              transition: 'all .3s',
              background: 'linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%)',
            }
          }}
        >
          <Stack direction='row'>
            <img alt='' style={{
              width: '60px',
              height: '60px',
              borderRadius: 10,
              objectFit: 'cover',
              boxShadow: '0px 0px 10px rgba(0,0,0,.1)'
            }} src={cartItem.mainImg}
            />
            <Stack height='100%' ml={1}>
              <Typography><b>{cartItem.title}</b></Typography>
              <Typography variant='body2'>R$ {cartItem.price}</Typography>
            </Stack>
          </Stack>
          <Stack alignItems='center' direction='row' gap={2.5}>
            <Box onClick={() => decreaseAmount(cartItem.id)}>
              <Typography fontSize={20} variant='button'>-</Typography>
            </Box>
            <Typography fontSize={20}>{cartItems.find(item => item.id === cartItem.id)?.amount}</Typography>
            <Box onClick={() => increaseAmount(cartItem.id)}>
              <Typography fontSize={18} variant='button'>+</Typography>
            </Box>
          </Stack>
        </Stack>
      ))}
      <Typography variant='button' mt={2} textAlign='right'>
        Total: R$ {totalItemsValue.toFixed(2)}
      </Typography>
    </Stack>
  )
}

