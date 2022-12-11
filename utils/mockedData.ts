export interface Product {
  id: number
  price: number
  title: string
  mainImg: string
  description: string
  imgs: Array<string>
  color?: Array<string>
  size?: Array<string>
}

export const products: Product[] = [
  {
    id: 0,
    price: 37.00,
    size: ['P', 'M', 'G', 'GG', 'XG'],
    title: 'T-shirt Unissex Thrasher',
    color: ['Branco', 'Preto', 'Amarelo'],
    description: '100% Algodão, fio 30.1',
    mainImg: '/products/tshirt-thrasher/main.webp',
    imgs: ['/products/tshirt-thrasher/main.webp', '/products/tshirt-thrasher/black.webp', '/products/tshirt-thrasher/yellow.webp'],
  },
  {
    id: 1,
    price: 65.55,
    color: ['Preto'],
    description: '100% Poliéster',
    size: ['P', 'M', 'G', 'GG', 'XG'],
    title: 'T-shirt Philosophy Basketball',
    mainImg: '/products/tshirt-philosophy-basket/main.webp',
    imgs: ['/products/tshirt-philosophy-basket/main.webp', '/products/tshirt-philosophy-basket/back.webp', '/products/tshirt-philosophy-basket/collar.webp'],
  },
  {
    id: 2,
    price: 195.44,
    color: ['Preto'],
    title: 'Calça jeans cargo',
    size: ['P', 'M', 'G', 'GG', 'XG'],
    mainImg: '/products/calca-jeans-1/main.png',
    description: 'Jeans, composição:	73% Algodão, 18% Poliéster e 9% Spandex',
    imgs: ['/products/calca-jeans-1/main.png', '/products/calca-jeans-1/back.png', '/products/calca-jeans-1/zoom-footer.png', '/products/calca-jeans-1/zoom-front.png'],
  },
  {
    id: 3,
    price: 18.20,
    size: ['M', 'G', 'GG'],
    title: 'Top para academia',
    color: ['Preto', 'Cinza', 'Azul', 'Rosa'],
    mainImg: '/products/top-feminino-1/main.png',
    description: '100% Poliéster, sem bojo, forrado e com alta sustentação, ideal para a prática de exercícios. Tecido grosso (não possui transparência)',
    imgs: ['/products/top-feminino-1/main.png', '/products/top-feminino-1/blue-and-pink.png'],
  },
  {
    id: 4,
    price: 33.8,
    color: ['Prata'],
    size: ['T. único'],
    title: 'Relógio unissex',
    mainImg: '/products/relogio/main.webp',
    imgs: ['/products/relogio/main.webp', '/products/relogio/size.webp'],
    description: 'Com iluminação, alarme, formato 24 ou 12h',
  },
  {
    id: 5,
    price: 64.4,
    color: ['Preto'],
    title: 'Bermuda street style',
    size: ['P', 'M', 'G', 'GG', 'XG'],
    mainImg: '/products/bermuda-masc-1/main.png',
    description: '100% Poliéster, ajuste regular',
    imgs: ['/products/bermuda-masc-1/main.png', '/products/bermuda-masc-1/front.png', '/products/bermuda-masc-1/zoom-1.png'],
  },
  {
    id: 6,
    price: 71.18,
    color: ['Branco'],
    description: '100% Algodão',
    title: 'T-shirt Watch Stealthily',
    size: ['P', 'M', 'G', 'GG', 'XG'],
    mainImg: '/products/t-shirt-2/main.png',
    imgs: ['/products/t-shirt-2/main.png', '/products/t-shirt-2/front.png', '/products/t-shirt-2/zoom.png'],
  },
  {
    id: 7,
    price: 71.18,
    color: ['Branco'],
    description: '100% Algodão',
    title: 'T-shirt fire white',
    size: ['P', 'M', 'G', 'GG', 'XG'],
    mainImg: '/products/t-shirt-3/main.png',
    imgs: ['/products/t-shirt-3/main.png', '/products/t-shirt-3/back.png', '/products/t-shirt-3/zoom.webp'],
  },
  {
    id: 8,
    price: 56.35,
    color: ['Preto'],
    title: 'T-shirt Gola alta',
    size: ['P', 'M', 'G', 'GG', 'XG'],
    mainImg: '/products/t-shirt-4/main.png',
    description: '95% Viscose, 5% Elastano. Colada ao corpo, perfeita para ser usada com acessórios',
    imgs: ['/products/t-shirt-4/main.png', '/products/t-shirt-4/back.png', '/products/t-shirt-4/zoom.png'],
  },
  {
    id: 8,
    price: 56.35,
    color: ['Preto'],
    title: 'T-shirt Gola alta',
    size: ['P', 'M', 'G', 'GG', 'XG'],
    mainImg: '/products/t-shirt-4/main.png',
    description: '95% Viscose, 5% Elastano. Colada ao corpo, perfeita para ser usada com acessórios',
    imgs: ['/products/t-shirt-4/main.png', '/products/t-shirt-4/back.png', '/products/t-shirt-4/zoom.png'],
  },
]
