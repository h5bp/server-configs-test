import { options, assert } from './abstract-test.js'

export { options }

const body404 = open('../fixtures/404.html')

export function setup () {
  return [
    {
      name: 404,
      requests: ['this/does/not.exist'],
      body: body404
    }
  ]
}

export default function (data) {
  assert(data, (test) => ({
    'is expected status': (r) => r.status === test.name,
    'is expected body': (r) => r.body === test.body
  }))
}
