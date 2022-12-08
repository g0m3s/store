/* eslint-disable @next/next/no-img-element */
import 'swiper/css'
// import '../styles/test.css'
import { useState } from 'react'
import { Autoplay } from 'swiper'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { keyframes } from '@emotion/react'
import { AddProductModal } from '../components'
import { getCartItems } from '../utils/cartItems'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Product, products } from '../utils/mockedData'
import { Grid, Stack, Tab, Tabs, Typography } from '@mui/material'
import { BookmarkBorder, HouseOutlined, SellOutlined, ShoppingBagOutlined } from '@mui/icons-material'

type CurrentScreenValues = 1 | 2

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [currentScreen, setCurrentScreen] = useState<CurrentScreenValues>(1)
  const [productModalIsOpen, setProductModalIsOpen] = useState<boolean>(false)

  const BannerExample = () => (
    <Stack mt={2} borderRadius={2} bgcolor='white' height={100} width={'100%'}>
    </Stack>
  )

  const onSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setProductModalIsOpen(true)
  }

  const hasItemsOnCart = !!getCartItems()

  return (
    <Stack
      sx={{
        padding: '0 1.5rem',
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
        <Swiper
          loop={true}
          speed={5000}
          spaceBetween={50}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
        >
          <SwiperSlide>
            {BannerExample}
          </SwiperSlide>
          <SwiperSlide>
            {BannerExample}
          </SwiperSlide>
        </Swiper>

        <Grid
          mt={3}
          container
          width='100%'
          height='76vh'
          alignItems='center'
          justifyContent='space-between'
        >
          {products.map(product => (
            <Grid
              item
              xs={6}
              mb={1}
              display='flex'
              key={product.id}
              direction='column'
              alignItems='center'
              justifyContent='center'
              sx={{ cursor: 'pointer' }}
              onClick={() => onSelectProduct(product)}
            >
              <img
                style={{
                  width: '93%',
                  borderRadius: 10,
                  objectFit: 'cover',
                }}
                src={product.mainImg}
                alt='product image'
              />
              <Stack mt={.5} width='93%' justifyContent='space-between' direction='row'>
                <Stack>
                  <Typography
                    fontSize='13px'
                    variant='body2'
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant='body2'
                    color='#87cefa'
                    fontSize='12px'
                  >
                    R${product.price}
                  </Typography>
                </Stack>
                <BookmarkBorder sx={{ opacity: .8 }} />
              </Stack>
            </Grid>
          ))}
        </Grid>

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
      </main>

      <AddProductModal
        product={selectedProduct}
        isOpen={productModalIsOpen}
        onClose={() => setProductModalIsOpen(false)}
      />
      {hasItemsOnCart && (
        <Stack
          py={2}
          px={1.5}
          bottom={40}
          width='90vw'
          color='white'
          direction='row'
          position='fixed'
          borderRadius={1}
          alignItems='center'
          className='boxWithSpinner'
          sx={{ cursor: 'pointer' }}
          justifyContent='space-between'
        >
          <Typography>Finalizar compra</Typography>
          <SellOutlined />
        </Stack>
      )}
    </Stack>
  )
}
