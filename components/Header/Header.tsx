import Image from 'next/image'
import { useState } from 'react'
import { Dialog, Stack, Typography } from '@mui/material'
import { useIsDarkMode } from '../../utils/useIsDarkMode'
import { EmailOutlined, Instagram, Menu as MenuItem, Brightness6Sharp } from '@mui/icons-material'

export const Header: React.FC = () => {
  const isDarkMode = useIsDarkMode()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const Menu = () => (
    <Dialog
      scroll='body'
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      PaperProps={{
        sx: {
          p: 3,
          right: 0,
          margin: 0,
          top: '8vh',
          width: '100%',
          borderRadius: 2,
          position: 'fixed',
          maxWidth: '75vw !important',
        }
      }}
    >
      <Stack
        width='100%'
        direction='row'
        justifyContent='space-between'
      >
        <Stack>
          <Typography variant='button'>Tema</Typography>
          <Typography my={2} variant='button'>Instagram</Typography>
          <Typography variant='button'>contado@lunastore.com</Typography>
        </Stack>
        <Stack>
          <Brightness6Sharp />
          <Instagram sx={{ my: 2 }} />
          <EmailOutlined />
        </Stack>
      </Stack>
    </Dialog>
  )


  return (
    <Stack
      sx={{
        top: 0,
        left: 0,
        zIndex: 999,
        height: '8vh',
        width: '100vw',
        bgcolor: 'black',
        position: 'fixed',
        borderBottom: `${!isDarkMode ? '2.5px' : '.8px'} solid transparent`,
        background: 'linear-gradient(black, black) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box',
      }}
    >
      <Stack px={2} height='100%' width='100%' direction='row' alignItems='center' justifyContent='space-between'>
        <Stack justifyContent='center'>
          <Image
            alt='logo'
            width={50}
            height={50}
            src='/img/logo.png'
          />
        </Stack>
        <Stack sx={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(true)}>
          <MenuItem sx={{ color: 'white' }} />
        </Stack>
      </Stack>
      <Menu />
    </Stack>
  )
}
