/* eslint-disable @next/next/no-img-element */
import 'swiper/css'
import Lottie from 'react-lottie'
import { useState } from 'react'
import { Product } from '../../utils/mockedData'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SetCurrentScreen } from '../../types/utils'
import { Dialog, Stack, Typography } from '@mui/material'
import { setNewCartItem } from '../../utils/localStorage'
import { useIsDarkMode } from '../../utils/useIsDarkMode'
import successAnimation from '../../public/animations/success.json'
import { SellOutlined, ShoppingBagOutlined } from '@mui/icons-material'

interface AddProductModalProps extends SetCurrentScreen {
  isOpen: boolean
  product?: Product
  onClose: () => void
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, product, setCurrentScreen }) => {
  const isDarkMode = useIsDarkMode()
  const [selectedSize, setSelectedSize] = useState<string>()
  const [selectedColor, setSelectedColor] = useState<string>()
  const [haveSizeError, setHaveSizeError] = useState<boolean>(false)
  const [haveColorError, setHaveColorError] = useState<boolean>(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  }

  const selectedItemsBgColor = (isSelected?: boolean) => {
    return isSelected ? 'black' : 'unset'
  }
  const selectedItemsColor = (isSelected?: boolean) => {
    return isSelected ? 'white' : 'black'
  }

  const addToCart = () => {
    if (!selectedSize) {
      setHaveSizeError(true)
    }
    if (!selectedColor) {
      setHaveColorError(true)
    }
    if (selectedSize && selectedColor) {
      setNewCartItem({
        ...product!,
        amount: 1,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      })
      setShowSuccessAnimation(true)
      setTimeout(() => {
        setSelectedSize('')
        setSelectedColor('')
        setShowSuccessAnimation(false)
        onClose()
      }, 2500)
    }
  }
  const finishOrder = () => {
    if (!selectedSize) {
      setHaveSizeError(true)
    }
    if (!selectedColor) {
      setHaveColorError(true)
    }
    if (selectedSize && selectedColor) {
      setNewCartItem({
        ...product!,
        amount: 1,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      })
      setCurrentScreen(2)
    }
  }

  return (
    <Dialog
      scroll='body'
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          left: 0,
          right: 0,
          margin: 0,
          bottom: 0,
          width: '100%',
          borderRadius: 0,
          maxHeight: '80vh',
          position: 'fixed',
          overflowX: 'hidden',
          bgcolor: 'transparent',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          maxWidth: '100vw !important',
          borderTop: '1px solid #9A00FF',
        }
      }}
    >

      <Stack
        width='100vw'
        alignItems='center'
        textAlign='center'
        justifyContent='center'
        display={showSuccessAnimation ? 'block' : 'none'}
      >
        <Lottie
          width={350}
          height={200}
          options={defaultOptions}
          isStopped={!showSuccessAnimation}
        />
        <Typography
          fontSize={20}
          variant='button'
          sx={{ textShadow: '0px 0px 5px rgba(0,0,0,.15)' }}
        >
          <b>Adicionado com sucesso</b>
        </Typography>
      </Stack>

      {!showSuccessAnimation && (
        <Stack position='relative' alignItems='center' justifyContent='center'>
          <Stack maxWidth='100vw'>
            {product?.imgs && (
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                style={{
                  maxWidth: '100vw',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  background: 'rgba(255, 255, 255, .8)',
                }}
              >
                {product?.imgs.map((imgPath, key) => (
                  <SwiperSlide key={key}>
                    <img
                      style={{
                        width: '100%',
                        height: '300px',
                        userSelect: 'none',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0px 0px 3.5px rgba(255,255,255,.1))',
                      }}
                      src={imgPath}
                      alt='product image'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Stack>
          <Stack sx={{
            width: '100vw',
            height: '10px',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(5px)',
            background: '-webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, .8)), to(#FFF))'
          }} />
          <Stack pb={3} bgcolor='#FFF' px={2} height='100%' width='100%'>
            <Typography mb={2} textAlign='center' variant='h4'><b>{product?.title}</b></Typography>
            <Typography variant='body2' mt={.5}>{product?.description}</Typography>
            <Typography
              mt={.5}
              fontSize='18px'
              textAlign='right'
              sx={{ textShadow: '0px 0px 3px rgba(0,0,0,.25)' }}
            >
              <b>R$ {product?.price.toFixed(2)}</b>
            </Typography>
            {product?.shippingFee === 0 ? (
              <Stack width='100%' alignItems='flex-end'>
                <Stack
                  px={.4}
                  borderRadius={1}
                  justifyContent='center'
                  sx={{
                    opacity: .9,
                    border: '.8px solid transparent',
                    background: `linear-gradient(white, white) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box`,
                  }}
                >
                  <Typography fontSize={9}>Frete grátis</Typography>
                </Stack>
              </Stack>
            ) : (
              <Typography fontSize={10} mt={1} textAlign='right'>
                Frete: + R$ {product?.shippingFee.toFixed(2)}
              </Typography>
            )}

            <Stack mt={1}>
              {product?.color && (
                <>
                  <Stack direction='row' alignItems='center'>
                    <Typography mr={.5} variant='body2'>Cor | modelo:</Typography>
                    {product.color.map(color => {
                      const isSelected = selectedColor === color
                      return (
                        <Stack
                          p={.5}
                          mx={.5}
                          key={color}
                          minWidth='50px'
                          borderRadius={1}
                          alignItems='center'
                          justifyContent='center'
                          sx={{ cursor: 'pointer' }}
                          border='1px solid rgba(0,0,0,.1)'
                          color={selectedItemsColor(isSelected)}
                          bgcolor={selectedItemsBgColor(isSelected)}
                          onClick={() => {
                            if (isSelected) {
                              return
                            }
                            setSelectedColor(color)
                          }}
                        >
                          <Typography fontSize='13px' variant='body2'>{color}</Typography>
                        </Stack>
                      )
                    })}
                  </Stack>
                  {haveColorError && <Typography fontSize={12} color='red' variant='body2'>Obrigatório</Typography>}
                </>
              )}
              {product?.size && (
                <>
                  <Stack flexWrap='wrap' mt={1} direction='row' alignItems='center'>
                    <Typography mr={.5} variant='body2'>Tamanho:</Typography>
                    {product.size.map(size => {
                      const isSelected = selectedSize === size
                      return (
                        <Stack
                          p={.5}
                          m={.5}
                          key={size}
                          minWidth='50px'
                          borderRadius={1}
                          alignItems='center'
                          justifyContent='center'
                          sx={{ cursor: 'pointer' }}
                          border='1px solid rgba(0,0,0,.1)'
                          color={selectedItemsColor(isSelected)}
                          bgcolor={selectedItemsBgColor(isSelected)}
                          onClick={() => {
                            if (isSelected) {
                              return
                            }
                            setSelectedSize(size)
                          }}
                        >
                          <Typography fontSize='13px' variant='body2'>{size}</Typography>
                        </Stack>
                      )
                    })}
                  </Stack>
                  {haveSizeError && <Typography fontSize={12} color='red' variant='body2'>Obrigatório</Typography>}
                </>
              )}
            </Stack>

            <Stack
              mt={2}
              p={1.5}
              direction='row'
              borderRadius={2}
              alignItems='center'
              onClick={() => addToCart()}
              justifyContent='space-between'
              sx={{ opacity: .6, cursor: 'pointer' }}
            >
              <Typography variant='button'>Adicionar ao carrinho</Typography>
              <ShoppingBagOutlined />
            </Stack>

            <Stack
              py={2}
              px={1.5}
              mt={1.5}
              direction='row'
              bgcolor='white'
              borderRadius={2}
              alignItems='center'
              position='relative'
              justifyContent='space-between'
              border={`${isDarkMode ? '1.5px' : '1px'} solid transparent`}
              sx={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box',
              }}
              onClick={() => finishOrder()}
            >
              <Typography
                variant='button'
                sx={{
                  color: 'transparent',
                  backgroundClip: 'text',
                  mozBackgroundClip: 'text',
                  webkitBackgroundClip: 'text',
                  backgroundImage: 'linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%)',
                }}
              >
                Comprar agora
              </Typography>
              <SellOutlined sx={{ color: 'orange' }} />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Dialog >
  )
}
