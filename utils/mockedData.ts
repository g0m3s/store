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
    price: 40.99,
    description: 'Short em Elastano com logo refletivo, três bolsos, hidro-repelente, resistente a lavagens e possui caimento entre a coxa e o joelho',
    title: 'Short High',
    mainImg: '/img/shorts-example.jpeg',
    imgs: ['/img/shorts-example.jpeg', '/img/shorts-example.jpeg'],
    color: ['Branco', 'Preto'],
    size: ['M', 'G', 'GG', 'G1'],
  },
  {
    id: 1,
    price: 40.99,
    description: '',
    title: 'Top Feminino',
    mainImg: '/img/top-example.jpeg',
    imgs: ['/img/top-example.jpeg', '/img/top-example.jpeg']
  },
  {
    id: 2,
    price: 40.99,
    description: '',
    title: 'Camiseta High',
    mainImg: '/img/tshirt-example.jpeg',
    imgs: ['/img/tshirt-example.jpeg', '/img/tshirt-example.jpeg']
  },
  {
    id: 3,
    price: 40.99,
    description: '',
    title: 'Camiseta Fire',
    mainImg: '/img/tshirt2-example.jpeg',
    imgs: ['/img/tshirt2-example.jpeg', '/img/tshirt2-example.jpeg']
  },
  {
    id: 4,
    price: 40.99,
    description: '',
    title: 'Short High',
    mainImg: '/img/shorts-example.jpeg',
    imgs: ['/img/shorts-example.jpeg', '/img/shorts-example.jpeg']
  },
  {
    id: 5,
    price: 40.99,
    description: '',
    title: 'Top Feminino',
    mainImg: '/img/top-example.jpeg',
    imgs: ['/img/top-example.jpeg', '/img/top-example.jpeg']
  },
  {
    id: 6,
    price: 40.99,
    description: '',
    title: 'Camiseta High',
    mainImg: '/img/tshirt-example.jpeg',
    imgs: ['/img/tshirt-example.jpeg', '/img/tshirt-example.jpeg']
  },
  {
    id: 7,
    price: 40.99,
    description: '',
    title: 'Camiseta Fire',
    mainImg: '/img/tshirt2-example.jpeg',
    imgs: ['/img/tshirt2-example.jpeg', '/img/tshirt2-example.jpeg']
  },
]
