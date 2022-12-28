import Lottie from 'react-lottie'
import { Dialog, Stack, Typography } from '@mui/material'
import errorAnimation from '../../public/animations/error.json'
import successAnimation from '../../public/animations/success.json'
import pendingAnimation from '../../public/animations/pending.json'

type AfterBuyProps = {
  state: 'successTrue' | 'successFalse' | 'pending'
}

export const AfterBuy: React.FC<AfterBuyProps> = ({ state }) => {

  const animation = () => {
    switch (state) {
      case 'successTrue':
        return successAnimation
      case 'successFalse':
        return errorAnimation
      case 'pending':
        return pendingAnimation

      default:
        return pendingAnimation
    }
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation(),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  }

  const texts = () => {
    switch (state) {
      case 'successTrue':
        return {
          title: 'Compra efetuada com sucesso 🥳',
          description: 'Você receberá mais informações via WhatsApp e poderá acompanhar seu pedido por lá'
        }
      case 'successFalse':
        return {
          title: 'Ops, ocorreu um problema ao efetuar sua compra',
          description: 'Tente novamente e em caso de dúvida entre em contato conosco'
        }
      case 'pending':
        return {
          title: 'Pagamento pendente',
          description: 'Você receberá mais informações via WhatsApp e poderá acompanhar seu pedido por lá'
        }

      default:
        return {
          title: 'Pagamento pendente',
          description: 'Você receberá mais informações via WhatsApp e poderá acompanhar seu pedido por lá'
        }
    }
  }

  return (
    <Dialog
      scroll='body'
      open={true}
      onClose={() => { }}
      PaperProps={{
        sx: {
          left: 0,
          right: 0,
          margin: 0,
          bottom: 0,
          width: '100%',
          height: '100vh',
          borderRadius: 0,
          position: 'fixed',
          overflowX: 'hidden',
          bgcolor: 'transparent',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          maxWidth: '100vw !important',
        }
      }}
    >
      <Stack textAlign='center' height='100%' color='#FFF' alignItems='center' justifyContent='center'>
        <Lottie
          height={200}
          options={defaultOptions}
          width={state === 'successTrue' ? 350 : 200}
        />
        <Typography
          fontSize={18}
          variant='button'
          sx={{ textShadow: '0px 0px 5px rgba(0,0,0,.15)' }}
        >
          <b>{texts().title}</b>
        </Typography>
        <Typography
          mt={2}
          width='80%'
          fontSize={14}
          variant='button'
          sx={{ textShadow: '0px 0px 5px rgba(0,0,0,.15)' }}
        >
          {texts().description}
        </Typography>
      </Stack>
    </Dialog>
  )
}
