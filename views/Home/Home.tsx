/* eslint-disable @next/next/no-img-element */
import { Autoplay } from 'swiper'
import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AddProductModal } from '../../components';
import { SetCurrentScreen } from '../../types/utils';
import { Grid, Stack, Typography } from '@mui/material';
import { useIsDarkMode } from '../../utils/useIsDarkMode';
import { Product, products } from '../../utils/mockedData';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { getFavoriteItems, setFavoriteItem } from '../../utils/localStorage';

export const Home: React.FC<SetCurrentScreen & { hasBottomMargin: boolean }> = ({ setCurrentScreen, hasBottomMargin }) => {
  const isDarkMode = useIsDarkMode()
  const [updateFavorites, setUpdateFavorites] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [productModalIsOpen, setProductModalIsOpen] = useState<boolean>(false)

  const onSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setProductModalIsOpen(true)
  }

  const favoriteItems = useMemo(() => {
    return getFavoriteItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFavorites])

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
            <Stack sx={{ opacity: .8 }} mt={2} borderRadius={2} bgcolor={isDarkMode ? 'white' : 'black'} height={100} width={'100%'} />
          </SwiperSlide>
          <SwiperSlide>
            <Stack sx={{ opacity: .8 }} mt={2} borderRadius={2} bgcolor={isDarkMode ? 'white' : 'black'} height={100} width={'100%'} />
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
              sx={{ cursor: 'pointer', opacity: .9 }}
            >
              <img
                style={{
                  width: '95%',
                  borderRadius: 10,
                  objectFit: 'cover',
                }}
                alt='product image'
                src={product.mainImg}
                onClick={() => onSelectProduct(product)}
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
                    fontSize='12px'
                  >
                    R${product.price}
                  </Typography>
                </Stack>
                {favoriteItems.find(item => item === product.id) !== undefined ? (
                  <Bookmark
                    sx={{ opacity: .8, cursor: 'pointer' }}
                    onClick={() => {
                      setFavoriteItem(product.id)
                      setUpdateFavorites(!updateFavorites)
                    }}
                  />
                ) : (
                  <BookmarkBorder
                    sx={{ opacity: .8, cursor: 'pointer' }}
                    onClick={() => {
                      setFavoriteItem(product.id)
                      setUpdateFavorites(!updateFavorites)
                    }}
                  />
                )}

              </Stack>
            </Grid>
          ))}
        </Grid>
      </main>
      <Stack height={hasBottomMargin ? '55vh' : '50vh'} />

      <AddProductModal
        product={selectedProduct}
        isOpen={productModalIsOpen}
        setCurrentScreen={setCurrentScreen}
        onClose={() => setProductModalIsOpen(false)}
      />

    </Stack>
  )
}
