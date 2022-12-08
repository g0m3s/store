export const CSScolorfulBackground = {
  cursor: 'pointer',
  ':before': {
    top: 0,
    left: 1,
    zIndex: -1,
    opacity: .35,
    content: '""',
    width: '98%',
    height: '100%',
    filter: 'blur(5px)',
    position: 'absolute',
    transition: 'all .3s',
    background: 'linear-gradient(80.42deg, #9A00FF 7.33%, #7241FF 51.42%, orange 92.84%)',
  }
}
