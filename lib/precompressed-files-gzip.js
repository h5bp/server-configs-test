import { options, test } from './abstract-test.js'

export { options }

export function setup () {
  return [{
    name: 'files are served compressed using precompressed files',
    requests: {
      'test-pre-gzip.js': {
        requestHeaders: {
          'Accept-Encoding': 'gzip, deflate'
        },
        body: 'gzip-content'
      }
    }
  }]
}

export default test
