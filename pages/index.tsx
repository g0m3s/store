import 'swiper/css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Header } from '../components'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { AfterBuy } from '../components/AfterBuy'
import { Home, Cart, FinishOrder } from '../views'
import { CurrentScreenValues } from '../types/utils'
import { Stack, Tab, Tabs, Typography, } from '@mui/material'
import { getCartItems, setNewCartItems } from '../utils/localStorage'
import { HouseOutlined, SellOutlined, ShoppingBagOutlined } from '@mui/icons-material'

type QueryParams = { success?: 'true' | 'false', pending?: 'true' }

export default function App() {
  const { query } = useRouter()
  const hasItemsOnCart = getCartItems().length > 0
  const [currentScreen, setCurrentScreen] = useState<CurrentScreenValues>(1)

  const footerHeight = useMemo(() => {
    if (hasItemsOnCart) {
      return 110
    }
    return 53
  }, [hasItemsOnCart])

  const container = () => {
    switch (currentScreen) {
      case 1:
        return (
          <Home
            bottomMargin={footerHeight}
            setCurrentScreen={setCurrentScreen}
          />
        )
      case 2:
        return (
          <Cart
            bottomMargin={footerHeight}
            setCurrentScreen={setCurrentScreen}
          />
        )
      case 3:
        return <FinishOrder />
      default:
        return (
          <Home
            bottomMargin={footerHeight}
            setCurrentScreen={setCurrentScreen}
          />
        )
    }
  }

  const queryState = useMemo(() => {
    const typedQuery = query as QueryParams

    if (typedQuery.success === 'true') {
      setNewCartItems([])
      return 'successTrue'
    }
    if (typedQuery.success === 'false') {
      return 'successFalse'
    }
    if (typedQuery.pending === 'true') {
      setNewCartItems([])
      return 'pending'
    }
    return undefined
  }, [query])

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
          {queryState !== undefined && <AfterBuy state={queryState} />}

          <Header />
          {container()}

          <Stack
            left={0}
            bottom={0}
            width='100vw'
            bgcolor='black'
            position='fixed'
          >
            <Tabs
              centered
              textColor='inherit'
              variant='fullWidth'
              value={currentScreen}
              sx={{ height: '50px' }}
              indicatorColor='secondary'
              TabIndicatorProps={{
                sx: {
                  height: '.8px',
                  bgcolor: 'white',
                }
              }}
              onChange={(_, newValue: CurrentScreenValues) => setCurrentScreen(newValue)}
            >
              <Tab icon={<HouseOutlined sx={{ height: '20px', opacity: .8, color: 'white' }} />} label='' value={1} />
              <Tab icon={<ShoppingBagOutlined sx={{ height: '20px', opacity: .8, color: 'white' }} />} label='' value={2} />
              {/* <Tab icon={<ShoppingBagOutlined sx={{ height: '20px', opacity: .8, color: 'white' }} />} label='' value={2} /> */}
            </Tabs>
          </Stack>
          {hasItemsOnCart && currentScreen !== 3 && (
            <Stack
              py={2}
              px={1.5}
              bottom={53}
              width='90vw'
              color='white'
              height='55px'
              direction='row'
              position='fixed'
              borderRadius={1}
              alignItems='center'
              className='boxWithSpinner'
              sx={{ cursor: 'pointer' }}
              justifyContent='space-between'
              onClick={() => currentScreen === 1 ? setCurrentScreen(2) : setCurrentScreen(3)}
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
