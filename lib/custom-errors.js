import { options, prepare, assert, isEqual } from './abstract-test.js'

export { options }

const responseBody = open('../dist/fixtures/404.html')

export function setup () {
  return prepare([
    {
      name: 'serves the custom 404 error',
      default: {
        responseBody
      },
      requests: ['this/does/not.exist']
    }
  ])
}

export default function (data) {
  assert(data, 'http://server.localhost/', (test) => ({
    'is expected status': (r) => isEqual(r, 'Status', r.status, 404),
    'is expected body': (r) => isEqual(r, 'body', r.body, test.responseBody)
  }))
}
