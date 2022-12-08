/* eslint-disable @next/next/no-img-element */
import { Autoplay } from 'swiper'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AddProductModal } from '../../components';
import { SetCurrentScreen } from '../../types/utils';
import { BookmarkBorder } from '@mui/icons-material';
import { Grid, Stack, Typography } from '@mui/material';
import { Product, products } from '../../utils/mockedData';

export const Home: React.FC<SetCurrentScreen> = ({ setCurrentScreen }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [productModalIsOpen, setProductModalIsOpen] = useState<boolean>(false)

  const BannerExample = () => (
    <Stack sx={{ opacity: .8 }} mt={2} borderRadius={2} bgcolor='white' height={100} width={'100%'}>
    </Stack>
  )

  const onSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setProductModalIsOpen(true)
  }

  return (
    <Stack mt='8vh'>
      <main>
        <Swiper
          loop={true}
          speed={3000}
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
              sx={{ cursor: 'pointer', opacity: .85 }}
              onClick={() => onSelectProduct(product)}
            >
              <img
                style={{
                  width: '95%',
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
      </main>

      <AddProductModal
        product={selectedProduct}
        isOpen={productModalIsOpen}
        setCurrentScreen={setCurrentScreen}
        onClose={() => setProductModalIsOpen(false)}
      />

    </Stack>
  )
}
