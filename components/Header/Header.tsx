import Image from "next/image"
import { Stack } from "@mui/material"

export const Header: React.FC = () => {
  return (
    <Stack
      sx={{
        top: 0,
        left: 0,
        height: '8vh',
        width: '100vw',
        bgcolor: 'black',
        position: 'fixed',
        borderBottom: '.8px solid transparent',
        background: 'linear-gradient(black, black) padding-box, linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%) border-box',
      }}
    >
      <Stack ml={2} height='100%' justifyContent='center'>
        <Image
          alt='logo'
          width={50}
          height={50}
          src='/img/logo.png'
        />
      </Stack>
    </Stack>
  )
}
