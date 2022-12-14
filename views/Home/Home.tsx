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
import banner from '../../public/img/banner.png';

export const Home: React.FC<SetCurrentScreen & { bottomMargin: number }> = ({ setCurrentScreen, bottomMargin }) => {
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
    <Stack height={`calc(100vh - ${bottomMargin}px)`} pt='8vh'>
      <main>
        <Swiper
          // loop={true}
          speed={3000}
          spaceBetween={50}
          slidesPerView={1}
        // modules={[Autoplay]}
        // autoplay={{ delay: 2000, disableOnInteraction: true }}
        >
          <SwiperSlide>
            <img
              alt=''
              src={`${banner.src}`}
              style={{
                height: 100,
                width: '100%',
                borderRadius: 10,
                marginTop: '16px',
                objectFit: 'contain',
                backgroundColor: 'white',
                border: '.5px solid rgba(0,0,0,.15)'
                // border: '.5px solid grey'
              }}
            />
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
              mb={2}
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
                  height: '150px',
                  borderRadius: 10,
                  objectFit: 'contain',
                  filter: isDarkMode ? 'drop-shadow(0px 0px 3.5px rgba(255,255,255,.5))' : 'none'
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

                  <Stack gap={1} direction='row' alignItems='center'>
                    <Typography
                      variant='body2'
                      fontSize='12px'
                    >
                      R${product.price.toFixed(2)}
                    </Typography>
                    {product.shippingFee === 0 && (
                      <Stack
                        px={.4}
                        borderRadius={1}
                        justifyContent='center'
                        sx={{
                          background: `linear-gradient(${isDarkMode ? 'black, black' : 'white, white'}) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box`,
                          border: '.8px solid transparent',
                          color: isDarkMode ? 'white' : 'black',
                          opacity: .9
                        }}
                      >
                        <Typography fontSize={9}>Frete grátis</Typography>
                      </Stack>
                    )}
                  </Stack>
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
      <Stack mb={bottomMargin / 8} />

      <AddProductModal
        product={selectedProduct}
        isOpen={productModalIsOpen}
        setCurrentScreen={setCurrentScreen}
        onClose={() => setProductModalIsOpen(false)}
      />

    </Stack>
  )
}
