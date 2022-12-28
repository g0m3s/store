import * as yup from 'yup'
import Lottie from 'react-lottie'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Stack, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCartItems } from '../../utils/localStorage'
import { useIsDarkMode } from '../../utils/useIsDarkMode'
import blackLoading from '../../public/animations/blackLoading.json'
import whiteLoading from '../../public/animations/whiteLoading.json'
import { LocalShippingOutlined, SellOutlined } from '@mui/icons-material'

interface FormProps {
  taxId: string
  street: string
  fullName: string
  district: string
  phoneNumber: string
  zipCode: string | number
  houseNumber: string | number

}

export const FinishOrder: React.FC = () => {
  const router = useRouter()
  const cartItems = getCartItems()
  const isDarkMode = useIsDarkMode()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const validationSchema: yup.SchemaOf<FormProps> = yup.object().shape({
    fullName: yup.string().required('Campo obrigatório'),
    street: yup.string().required('Campo obrigatório'),
    district: yup.string().required('Campo obrigatório'),
    zipCode: yup.string().min(8, 'CEP precisa ter 8 dígitos').required('Campo obrigatório'),
    houseNumber: yup.string().required('Campo obrigatório'),
    taxId: yup.string().min(8, 'CEP precisa ter 8 dígitos').required('Campo obrigatório'),
    phoneNumber: yup.string().required('Campo obrigatório').matches(/^\d{10,14}$/, 'Celular inválido'),

  })

  const defaultValues: FormProps = {
    fullName: '',
    street: '',
    district: '',
    zipCode: '',
    houseNumber: '',
    taxId: '',
    phoneNumber: '',
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const inputStyle = {
    padding: 16,
    fontSize: 16,
    width: '100%',
    color: 'black',
    borderRadius: 6,
    outline: 'none',
    // appearance: 'none',
    border: `${isDarkMode ? '1.5px' : '1px'} solid transparent`,
    background: 'linear-gradient(white, white) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box',
  }

  const onSubmit = (data: FormProps) => {
    setIsLoading(true)
    const userInfos = {
      name: data.fullName,
      surname: '',
      email: '',
      date_created: new Date().toDateString(),
      phone: {
        area_code: data.phoneNumber.slice(0, 2),
        number: data.phoneNumber.slice(2, 11)
      },

      identification: {
        type: "CPF",
        number: data.taxId
      },

      address: {
        street_name: data.street,
        street_number: data.houseNumber,
        zip_code: data.zipCode
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
        payer: userInfos,
        back_urls: {
          success: 'https://www.lunastore.me?success=true',
          failure: 'https://www.lunastore.me?success=false',
          pending: 'https://www.lunastore.me?pending=true'
        },
        auto_return: "approved",
        statement_descriptor: "Luna-store"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setIsLoading(false)
        router.push(data.sandbox_init_point)
      })
  }

  if (isLoading) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: isDarkMode ? blackLoading : whiteLoading,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      },
    }
    return (
      <Stack alignItems='center' justifyContent='center' height='100vh' >
        <Lottie
          width={350}
          height={250}
          options={defaultOptions}
        />
        <Typography fontSize={16} variant='button' textAlign='center'>
          <b>Carregando...</b>
        </Typography>
        <Typography textAlign='center'>
          você será redirecionado para efetuar o pagamento
        </Typography>
      </Stack>
    )
  }

  return (
    <Stack justifyContent='space-between' mt='8vh' pb={8}>
      <Stack>
        <Stack justifyContent='space-between' my={3} width='100%' direction='row' alignItems='center'>
          <Typography textAlign='center' variant='h4'><b>Informações de envio</b></Typography>
          <LocalShippingOutlined />
        </Stack>
        <Stack component='form' onSubmit={handleSubmit(onSubmit)} gap={2}>
          <Stack>
            {errors.fullName?.message && (<Typography fontSize={12} color='red'>{errors.fullName?.message}</Typography>)}
            <input style={{ ...inputStyle }} {...register('fullName')} type='text' placeholder='Nome Completo' />
          </Stack>
          <Stack>
            {errors.street?.message && (<Typography fontSize={12} color='red'>{errors.street?.message}</Typography>)}
            <input style={{ ...inputStyle }} {...register('street')} type='text' placeholder='Rua' />
          </Stack>
          <Stack>
            {errors.district?.message && (<Typography fontSize={12} color='red'>{errors.district?.message}</Typography>)}
            <input style={{ ...inputStyle }} {...register('district')} type='text' placeholder='Bairro' />
          </Stack>
          <Stack gap={1} direction='row' width='100%' justifyContent='space-between'>
            <Stack>
              {errors.houseNumber?.message && (<Typography fontSize={12} color='red'>{errors.houseNumber?.message}</Typography>)}
              <input style={{ ...inputStyle }} {...register('houseNumber')} type='number' placeholder='Número' />
            </Stack>
            <Stack>
              {errors.zipCode?.message && (<Typography fontSize={12} color='red'>{errors.zipCode?.message}</Typography>)}
              <input style={{ ...inputStyle }} {...register('zipCode')} type='number' placeholder='CEP' />
            </Stack>
          </Stack>
          <Stack>
            {errors.taxId?.message && (<Typography fontSize={12} color='red'>{errors.taxId?.message}</Typography>)}
            <input style={{ ...inputStyle }} {...register('taxId')} type='number' placeholder='CPF' />
          </Stack>
          <Stack>
            {errors.phoneNumber?.message && (<Typography fontSize={12} color='red'>{errors.phoneNumber?.message}</Typography>)}
            <input style={{ ...inputStyle }} {...register('phoneNumber')} type='tel' placeholder='Número de telefone (WhatsApp)' />
          </Stack>

          <Stack
            py={2}
            mt={6}
            px={1.5}
            type='submit'
            direction='row'
            borderRadius={2}
            component='button'
            alignItems='center'
            position='relative'
            justifyContent='space-between'
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
        </Stack>
      </Stack>

      <Stack mt={4}>
        <Typography fontSize={12} variant='body2'>* O tempo estimado para entrega é de 20 dias</Typography>
        <Typography fontSize={12} variant='body2'>* Você será atualizado sobre sua compra no número informado</Typography>
      </Stack>
    </Stack>
  )
}
