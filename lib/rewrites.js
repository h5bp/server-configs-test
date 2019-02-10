import { options, assert } from './abstract-test.js'

export { options }

export function setup () {
  return [
    {
      name: 'no-www',
      requests: ['http://www.server.localhost/'],
      location: 'http://server.localhost/'
    },
    {
      name: 'www',
      requests: ['http://www-server.localhost/'],
      location: 'http://www.www-server.localhost/'
    },
    {
      name: 'secure',
      requests: ['http://secure.server.localhost/'],
      location: 'https://secure.server.localhost/'
    },
    {
      name: 'secure first',
      requests: ['http://www.secure.server.localhost/'],
      location: 'https://www.secure.server.localhost/'
    },
    {
      name: 'secure no-www',
      requests: ['https://www.secure.server.localhost/'],
      location: 'https://secure.server.localhost/'
    }
  ]
}

export default function (data) {
  assert(data, (test) => ({
    'is status 301': (r) => r.status === 301,
    'is expected location': (r) => r.headers['Location'] === test.location
  }))
}
