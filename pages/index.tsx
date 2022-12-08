import 'swiper/css'
import { useState } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Home, Cart } from '../views'
import { Header } from '../components'
import { getCartItems } from '../utils/cartItems'
import { CurrentScreenValues } from '../types/utils'
import { Stack, Tab, Tabs, Typography, } from '@mui/material'
import { HouseOutlined, SellOutlined, ShoppingBagOutlined } from '@mui/icons-material'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<CurrentScreenValues>(1)
  const hasItemsOnCart = getCartItems().length > 0

  const container = () => {
    switch (currentScreen) {
      case 1:
        return <Home setCurrentScreen={setCurrentScreen} />
      case 2:
        return <Cart setCurrentScreen={setCurrentScreen} />
      default:
        return <Home setCurrentScreen={setCurrentScreen} />
    }
  }

  return (
    <Stack
      sx={{
        padding: '0 1rem',
        overflowY: 'scroll',
        '*::-webkit-scrollbar': {
          width: '5px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: 2,
          backgroundColor: 'rgba(0,0,0,.1)',
        }
      }}
    >

      <main>
        <>
          <Header />
          {container()}

          <Stack bgcolor='black' width='100vw' position='fixed' left={0} bottom={0}>
            <Tabs
              centered
              textColor='inherit'
              variant='fullWidth'
              value={currentScreen}
              indicatorColor='secondary'
              TabIndicatorProps={{
                sx: {
                  height: '.8px',
                  bgcolor: 'white',
                }
              }}
              onChange={(_, newValue: CurrentScreenValues) => setCurrentScreen(newValue)}
            >
              <Tab icon={<HouseOutlined sx={{ height: '20px', opacity: .8 }} />} label='' value={1} />
              <Tab icon={<ShoppingBagOutlined sx={{ height: '20px', opacity: .8 }} />} label='' value={2} />
            </Tabs>
          </Stack>
          {hasItemsOnCart && (
            <Stack
              py={2}
              px={1.5}
              bottom={48}
              width='90vw'
              color='white'
              direction='row'
              position='fixed'
              borderRadius={1}
              alignItems='center'
              className='boxWithSpinner'
              sx={{ cursor: 'pointer' }}
              justifyContent='space-between'
              onClick={() => setCurrentScreen(2)}
            >
              <Typography>
                {currentScreen === 1 ? 'Finalizar compra' : 'Continuar para pagamento'}
              </Typography>
              <SellOutlined />
            </Stack>
          )}
        </>
      </main>
    </Stack>
  )
}
