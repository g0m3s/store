/* eslint-disable @next/next/no-img-element */
import 'swiper/css'
import Lottie from 'react-lottie'
import { useEffect, useState } from 'react'
import { Product } from '../../utils/mockedData'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SetCurrentScreen } from '../../types/utils'
import { Dialog, Stack, Typography } from '@mui/material'
import { setNewCartItem } from '../../utils/localStorage'
import { useIsDarkMode } from '../../utils/useIsDarkMode'
import { CSScolorfulBackground } from '../../utils/cssStyles'
import addToBagAnimation from '../../public/animations/addToBag.json'
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
  const [addItemToBag, setAddItemToBag] = useState<boolean>(false)
  const [haveSizeError, setHaveSizeError] = useState<boolean>(false)
  const [haveColorError, setHaveColorError] = useState<boolean>(false)

  const onCloseModal = () => {
    setAddItemToBag(false)
    onClose()
  }

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: addToBagAnimation,
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
    if (!haveColorError) {
      setHaveColorError(true)
    }
    if (selectedSize && haveColorError) {
      setNewCartItem({
        ...product!,
        amount: 1,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      })
      setCurrentScreen(2)
    }
  }

  useEffect(() => {
    () => {
      setSelectedSize('')
      setSelectedColor('')
      setAddItemToBag(false)
    }
  })

  return (
    <Dialog
      scroll='body'
      open={isOpen}
      onClose={onCloseModal}
      PaperProps={{
        sx: {
          py: 3,
          left: 0,
          right: 0,
          margin: 0,
          bottom: 0,
          width: '100%',
          borderRadius: 0,
          bgcolor: 'white',
          maxHeight: '80vh',
          position: 'fixed',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          maxWidth: '100vw !important',
        }
      }}
    >
      <Stack position='relative' alignItems='center' justifyContent='center'>
        <Stack mb={1} borderRadius={10} bgcolor='black' width={40} height={8} />
        <Stack px={2} height='100%' width='100%'>
          <Typography mb={2} textAlign='center' variant='h4'><b>{product?.title}</b></Typography>

          <Stack maxWidth='100vw'>
            {product?.imgs && (
              <Swiper
                spaceBetween={30}
                slidesPerView={1.2}
                style={{ maxWidth: '95vw' }}
              >
                {product?.imgs.map((imgPath, key) => (
                  <SwiperSlide key={key}>
                    <img
                      style={{
                        width: '100%',
                        height: '300px',
                        borderRadius: 10,
                        objectFit: 'contain',
                        boxShadow: '0px 0px 10px rgba(0,0,0,.1)'
                      }}
                      src={imgPath}
                      alt='product image'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Stack>

          <Typography variant='body2' mt={.5}>{product?.description}</Typography>
          <Typography
            mt={.5}
            fontSize='18px'
            textAlign='right'
            sx={{ textShadow: '0px 0px 3px rgba(0,0,0,.25)' }}
          >
            <b>R$ {product?.price.toFixed(2)}</b>
          </Typography>

          <Stack>
            {product?.color && (
              <>
                <Stack direction='row' alignItems='center'>
                  <Typography mr={.5} variant='body2'>Cor:</Typography>
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
                        onClick={() => setSelectedColor(color)}
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
                <Stack mt={1} direction='row' alignItems='center'>
                  <Typography mr={.5} variant='body2'>Tamanho:</Typography>
                  {product.size.map(size => {
                    const isSelected = selectedSize === size
                    return (
                      <Stack
                        p={.5}
                        mx={.5}
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
            onClick={() => addToCart()}
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

      {
        addItemToBag && (
          <Stack
            sx={{
              top: 0,
              zIndex: 999,
              width: '100%',
              height: '100%',
              bgcolor: 'white',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: addItemToBag ? 1 : 0
            }}>
            <Lottie
              width={350}
              height={350}
              speed={3000}
              isPaused={!addItemToBag}
              options={defaultOptions}
            />
          </Stack>
        )
      }
    </Dialog >
  )
}
