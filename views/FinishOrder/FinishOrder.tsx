import { Stack, Typography } from '@mui/material'
import { getCartItems } from '../../utils/localStorage'
import { useIsDarkMode } from '../../utils/useIsDarkMode'
import { LocalShippingOutlined, SellOutlined } from '@mui/icons-material'
import { useMemo } from 'react'

interface InputProps {
  placeholder: string
  type: 'email' | 'number' | 'tel' | 'text'
}

export const FinishOrder: React.FC = () => {
  const isDarkMode = useIsDarkMode()
  const cartItems = getCartItems()

  const formattedProducts = useMemo(() => {
    const newProducts = cartItems.map(product => ({
      quantity: product.amount,
      unit_price: product.price,
      currency_id: 'BRL',
      title: product.title,
    }))
    return {
      items: newProducts
    }
  }, [cartItems])

  // "statement_descriptor": "MEUNEGOCIO"

  const generatePayment = () => {
    const payer = {
      name: "Joao",
      surname: "Silva",
      email: "user@email.com",
      date_created: "2015-06-02T12:58:41.425-04:00",
      phone: {
        area_code: "11",
        number: "4444-4444"
      },

      identification: {
        type: "CPF",
        number: "19119119100"
      },

      address: {
        street_name: "Street",
        street_number: "123",
        zip_code: "06233200"
      }
    }

    fetch('https://api.mercadopago.com/checkout/preferences?access_token=TEST-2695835969132247-091016-b273d891d970e2507fa0e0ce7bf26aff-241738789', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formattedProducts,
        back_urls: {
          success: 'http://localhost:3000',
          failure: 'http:/localhost:3000',
          pending: 'http:/localhost:3000'
        },
        auto_return: "approved",
        statement_descriptor: "Luna-store"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        window.open(data.sandbox_init_point)
      })
  }

  const Input: React.FC<InputProps> = (props) => (
    <input
      {...props}
      style={{
        padding: 16,
        fontSize: 16,
        width: '100%',
        color: 'black',
        borderRadius: 6,
        outline: 'none',
        appearance: 'none',
        border: `${isDarkMode ? '1.5px' : '1px'} solid transparent`,
        background: 'linear-gradient(white, white) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box',
      }}
    />
  )

  return (
    <Stack height='85vh' justifyContent='space-between' mt='8vh' pb={8}>
      <Stack>
        <Stack my={3} width='100%' direction='row' alignItems='center' justifyContent='space-between'>
          <Typography textAlign='center' variant='h4'><b>Informações de envio</b></Typography>
          <LocalShippingOutlined />
        </Stack>
        <Stack gap={2}>
          <Input type='text' placeholder='Nome Completo' />
          <Input type='text' placeholder='Rua' />
          <Input type='text' placeholder='Bairro' />
          <Stack gap={1} direction='row' width='100%' justifyContent='space-between'>
            <Input type='text' placeholder='Número' />
            <Input type='number' placeholder='CEP' />
          </Stack>
          <Input type='number' placeholder='CPF' />
          <Input type='tel' placeholder='Número de telefone (WhatsApp)' />
        </Stack>
      </Stack>

      <Stack
        py={2}
        px={1.5}
        mt={1.5}
        direction='row'
        borderRadius={2}
        alignItems='center'
        position='relative'
        justifyContent='space-between'
        onClick={() => generatePayment()}
        bgcolor={isDarkMode ? 'white' : 'black'}
        border={`${isDarkMode ? '1.5px' : '1px'} solid transparent`}
        sx={{
          background: `linear-gradient(${isDarkMode ? 'white, white' : 'black, black'}) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box`,
        }}
      >
        <Typography
          variant='button'
          sx={{
            backgroundClip: 'text',
            mozBackgroundClip: 'text',
            webkitBackgroundClip: 'text',
            color: isDarkMode ? 'transparent' : 'white',
            backgroundImage: 'linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%)',
          }}
        >
          Finalizar compra
        </Typography>
        <SellOutlined sx={{ color: isDarkMode ? 'orange' : 'white', }} />
      </Stack>

      <Stack position='fixed' bottom='50px'>
        <Typography fontSize={12} variant='body2'>* O tempo estimado para entrega é de 20 dias</Typography>
        <Typography fontSize={12} variant='body2'>* Você será atualizado sobre sua compra no número informado</Typography>
      </Stack>
    </Stack>
  )
}
