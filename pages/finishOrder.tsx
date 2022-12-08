import { NextPage } from 'next';

const FinishOrder: NextPage = () => {

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

  return (
    <div>
      n telefone
      endereço
      cpf
      15 reais de frete
      <button onClick={() => teste()}>teste</button>
    </div>
  )
}

export default FinishOrder
