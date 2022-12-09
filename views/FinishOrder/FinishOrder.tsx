import { SellOutlined } from '@mui/icons-material'
import { Stack, TextField, Typography } from '@mui/material'
import { useIsDarkMode } from '../../utils/useIsDarkMode'

interface InputProps {
  placeholder: string
}

export const FinishOrder: React.FC = () => {
  const isDarkMode = useIsDarkMode()

  const testBody = {
    items: [
      {
        quantity: 1,
        unit_price: 40.99,
        currency_id: 'BRL',
        title: 'Short High',
      },
    ]
  }

  const teste = () => {
    fetch('https://api.mercadopago.com/checkout/preferences?access_token=TEST-2695835969132247-091016-b273d891d970e2507fa0e0ce7bf26aff-241738789', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testBody)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }

  const Input: React.FC<InputProps> = (props) => (
    <input
      {...props}
      style={{
        padding: 16,
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
    <Stack mt='18vh'>
      {/* n telefone
      endereço
      cpf
      15 reais de frete */}
      <Stack gap={2}>
        <Input placeholder='Nome Completo' />
        <Input placeholder='Rua' />
        <Stack gap={1} direction='row' width='100%' justifyContent='space-between'>
          <Input placeholder='CEP' />
          <Input placeholder='Bairro' />
        </Stack>
        <Input placeholder='CPF' />
        <Input placeholder='N° de telefone' />
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
        // sx={CSScolorfulBackground}
        justifyContent='space-between'
        border={`${isDarkMode ? '1.5px' : '1px'} solid transparent`}
        sx={{
          background: 'linear-gradient(white, white) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box',
        }}
      // border='1px solid rgba(0,0,0,.1)'
      // onClick={() => {
      //   addToCart()
      //   setCurrentScreen(2)
      // }}
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

    </Stack >
  )
}
