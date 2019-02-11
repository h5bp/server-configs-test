import { options, prepare, assert } from './abstract-test.js'

export { options }

const responseBody = open('../fixtures/404.html')

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
    'is expected status': (r) => r.status === 404,
    'is expected body': (r) => r.body === test.responseBody || console.log(JSON.stringify(test.responseBody))
  }))
}
