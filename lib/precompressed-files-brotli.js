import { options, prepare, test } from './abstract-test.js'

export { options }

export function setup () {
  return prepare([{
    name: 'files are served compressed using precompressed files',
    domain: 'http://server.localhost/',
    default: {
      requestHeaders: {
        'Accept-Encoding': 'br'
      }
    },
    requests: ['test-pre-brotli.js']
  }])
}

export default test
