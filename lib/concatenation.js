import { options, assert } from './abstract-test.js'

export { options }

const a = open('../fixtures/a.css')
const b = open('../fixtures/b.css')

export function setup () {
  return [
    {
      name: 'file concatenation works',
      requests: [
        'test.combined.css',
        'test.combined.js'
      ],
      body: `${a}\n${b}`
    }
  ]
}

export default function (data) {
  assert(data, (test) => ({
    'is expected status': (r) => r.status === 200,
    'is expected body': (r) => r.body === test.body || console.log(r.body)
  }), 'http://server.localhost/')
}
