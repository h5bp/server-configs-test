import { options, prepare, assert, isEqual } from './abstract-test.js'

export { options }

const a = open('../fixtures/a.css')
const b = open('../fixtures/b.css')

export function setup () {
  return prepare([
    {
      name: 'file concatenation works',
      default: {
        responseBody: `${a}\n${b}`
      },
      requests: [
        'test.combined.css',
        'test.combined.js'
      ]
    }
  ])
}

export default function (data) {
  assert(data, 'http://server.localhost/', (test) => ({
    'is expected status': (r) => isEqual(r, 'Status', r.status, 404),
    'is expected body': (r) => isEqual(r, 'body', r.body, test.responseBody)
  }))
}
