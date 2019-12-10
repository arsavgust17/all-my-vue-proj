#!/usr/bin/env node
const jsonServer = require('json-server')
var bodyParser = require('body-parser')
const server = jsonServer.create()
const router = jsonServer.router('db/db.json')
const middlewares = jsonServer.defaults()

server.use(bodyParser.json())
server.use(makeDelay(350))
server.use(middlewares)
// server.use((req, res, next) => res.status(500).send(
//   { errors:
//       [{
//         'code': 'invalidCardNumber',
//         'Message': 'Неподходящий номер карты'
//       }]
//   }))
server.get('/payment', (req, res) => res.send({
  'data': [
    {
      'type': 'gold_crown',
      'terminal': 'https://qiwi.com/replenish/map.action',
      'pay_online': 'https://visa.qiwi.com/payment/form.action?provider=24183'
    },
    {
      'type': 'mkb',
      'terminal': 'http://mkb.ru/about_bank/address/?type=terminal'
    },
    {
      'type': 'invoice',
      'terminal': 'https://webbankir.com/invoice'
    },
    {
      'type': 'qiwi',
      'terminal': 'https://qiwi.com/replenish/map.action',
      'pay_online': 'https://visa.qiwi.com/payment/form.action?provider=24183'
    }
  ]
}))
server.get('/pay-order', (req, res) => res.send({
  'data': [
    {
      id: 213124,
      type: 1,
      orderNumber: '№234124/1',
      sum: 8240
    },
    {
      id: 123243,
      type: 3,
      orderNumber: '№12232323/2',
      sum: 3090
    },
    {
      id: 212144,
      type: 2,
      orderNumber: '№143434323/2',
      sum: 450
    }
  ]
}))
server.post('/payment/create/card', (req, res) =>
  res.send({
    'data': {
      'url': 'https://secure.payler.com/gapi/Pay?session_id=lny3nGvISKHc1wa9a9xRSw1q3QkU8CrD1yhP',
      'agregator': 'payler'
    }
  }))

server.post('/payment/create/yandex', (req, res) =>
  res.send({
    'data': {
      'url': 'https://money.yandex.ru/eshop.xml',
      'paymentType': 'PC',
      'shopId': 48076,
      'scid': '62713,',
      'customNumber': '131225303',
      'orderNumber': 'WB_131225303-152628548982460758',
      'paymentOrder': 12345
    }
  }))
server.post('/payment/create/sberbank', (req, res) =>
  res.send({
    'data': {
      'url': 'https://money.yandex.ru/eshop.xml',
      'paymentType': 'PC',
      'shopId': 48075,
      'scid': '62713,',
      'customNumber': '131225303',
      'orderNumber': 'WB_131225303-152628548982460758',
      'paymentOrder': 12345
    }
  }))

server.post('/user/login', (req, res) => res.send({data: {token: 'mock-token', tokenExpired: '99999999999999'}}))
server.put('/accounts', putAccount)
server.delete('/accounts', delAccount)
server.post('/loan/create', loanCreate)
server.post('/loan/calc', loanCalc)
server.get('/loan/get/current/pdl', loanGetCurrentPdl)
server.get('/accounts', (req, res) => res.send({data: router.db.get('accounts')}))
server.patch('/accounts', unsetPrimaryFromAllCards)
server.post('/dops/get', dopsGet)
server.post('/docs/get', docsGet)
server.post('/registration', (req, res) => res.send({userName: 'Andrew'}))
server.get('/supplementary/calc', supplementaryCalc)
server.use(dopsCreate)
server.use(router)

function supplementaryCalc (req, res) {
  const data = {
    'docText': 'Какой-то текст соглашения', // NotNull текст соглашения
    'percentsSum': 200, // Проценты по займу
    'commissions': 2.2, // коммисии и штрафы

    'percents': [2, 2, 2, 2.1, 2.1, 2.1, 2.2, 2.2, 2.2], // Массив Float,  процентная ставка на каждый конкретный день,
    'state': 0, // Int, 0 -все хорошо и можно пролонгировать, 1 - необходимо подписать пролонгацию, 2 - необходимо оплатить, 3 - не возможно пролонгировать
    'startAt': '' // Date - когда начнет действовать пролонгация
  }
  res.send({data})
}

function delAccount (req, res) {
  // const account = req.body
  console.log(req.body)
  res.send({})
  // router.db.get('accounts').find()   res.send({'status_code': 200}
}

function putAccount (req, res) {
  // res.status(400).send({
  //   errors: [
  //     {code: 'cardNumberInvalid', Message: 'Неверный номер карты'},
  //     {code: 'frontDoesntKnow', Message: 'Фронт не распознал эту ошибку'}
  //   ]
  // })
  // return
  const account = req.body
  console.log(account)
  const newAccount = {
    description: account.number,
    id: Math.round(Math.random() * 100000),
    name: '',
    main: 0,
    activated: 1,
    type: 1,
    type_name: 'MasterCard'
  }
  router.db.get('accounts').push(newAccount).write()
  // console.log(account)
  res.send(newAccount)
}

function makeDelay (delay) {
  return (req, res, next) => setTimeout(next, delay)
}

function loanGetCurrentPdl (req, res) {
  const response = {
    'data': router.db.get('activepdl').value()
  }
  res.send(JSON.stringify(response))
}

function loanCreate (req, res) {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  const json = req.body
  const activeLoan = {
    'id': 78,
    'type': 1,
    'num': 3,
    'status': 3,
    'statusText': 'Одобрен',
    'sum': 1000.00,
    'sumLeft': 1000.00,
    'sumPenalty': 0.00,
    'sumPercent': 90.00,
    'sumTotal': 1090.00,
    'days': 5,
    'daysLeft': 5,
    'percent': 1.9,
    'bankAccount': '4111-****-****-1111',
    'paySystem': 1,
    'orderNumber': '111222333/1',
    'dateFrom': '2019-01-01 00:00:00',
    'dateTo': '2019-01-05 23:59:59',
    'webserviceLastUpdate': '2019-01-01 00:20:00',
    'daysDelay': -5,
    'supplementary': {
    }
  }
  router.db.set('activepdl', activeLoan).write()
  res.send([activeLoan])
  setTimeout(() => {
    router.db.set('activepdl', {...activeLoan, 'status': 3, 'statusText': 'Одобрен'}).write()
    setTimeout(() => router.db.set('activepdl', {}).write(), 60000)
  }, 15000)
}

function loanCalc (req, res, next) {
  console.log('What the fuck am i doing here?')
  const {promoCode} = req.body
  const standart = {'data': {
    'percent': 1.9,
    'period_min': 5,
    'period_max': 15,
    'sum_min': 1000,
    'sum_max': 15000
  }}
  const promocodeaction = {'data': {
    'percent': 1,
    'period_min': 5,
    'period_max': 15,
    'sum_min': 1000,
    'sum_max': 15000,
    'promo_code': '21skidka',
    'promo_expired': 1353324804,
    'promo_description': 'Промокод на 19 марта для VK'
  }}
  console.log(promoCode)
  const invalidpromocode = {
    errors: [{code: 'invalidPromo', message: 'Invalid promocode'}]
  }
  const nomoretries = {
    errors: [{code: 'tooManyTries', message: 'promoBlocked'}]
  }
  // res.send(nomoretries)
  switch (promoCode) {
    case '21skidka':
      res.send(promocodeaction)
      break
    case '':
      res.send(standart)
      break
    case 'many':
      res.status(400).send(nomoretries)
      break
    case 'back':
      res.status(400).send({errors: [{code: 'noThisErrorInFront', message: 'Это ошибка с бэка'}]})
      break
    default:
      res.status(400).send(invalidpromocode)
  }
}

function docsGet (req, res, next) {
  // res.status(400).send('Ощибка')
  // return
  const {creditId} = req.body
  const response = {data: router.db.get('docs').filter({ creditId }).value()}
  res.send(response)
}

function dopsGet (req, res, next) {
  // res.status(400).send('Какаято ошибка')
  const {creditId} = req.body
  const response = router.db.get('dops').filter({ creditId }).value()
  res.send(JSON.stringify(response))
}

function dopsCreate (req, res, next) {
  const regexp = /dops\/create/
  if (req.url.search(regexp) === 1) {
    const json = req.body
    console.log(json)
    res.setHeader('Content-Type', 'application/json')
    const response = {
      'data': [
        {
          'link': 'https://promo.wi-fi.ru/assets/MT-Place-offer-v3.pdf'
        }
      ]
    }
    res.send(JSON.stringify(response))
  } else {
    next()
  }
}

function unsetPrimaryFromAllCards (req, res, next) {
  const card = req.body
  console.log(card)
  const accounts = router.db.get('accounts')
  if (card.main === 1) { accounts.find({main: 1}).assign({main: 0}).write() }
  accounts.find({id: card.id}).assign(card).write()
  console.log('YEAH')
  res.send(200)
}

server.listen(5354, '0.0.0.0', () => {
  console.log('JSON Server is running')
})
