import { options, assert } from './abstract-test.js'

export { options }

const body = open('../fixtures/404.html')

export function setup () {
  return [
    {
      name: 'serves the custom 404 error',
      requests: ['this/does/not.exist'],
      body
    }
  ]
}

export default function (data) {
  assert(data, (test) => ({
    'is expected status': (r) => r.status === 404,
    'is expected body': (r) => r.body === test.body || console.log(r.body)
  }), 'http://server.localhost/')
}
