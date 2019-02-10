import { options, test } from './abstract-test.js'

export { options }

export function setup () {
  return [{
    name: 'files are served compressed using precompressed files',
    requests: {
      'test-pre-brotli.js': {
        requestHeaders: {
          'Accept-Encoding': 'br'
        },
        body: 'brotli-content'
      }
    }
  }]
}

export default test
