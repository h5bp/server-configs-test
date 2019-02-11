import { options, prepare, test } from './abstract-test.js'

export { options }

export function setup () {
  return prepare([
    {
      name: 'files are served compressed even if the Accept-Encoding is mangled',
      domain: 'http://server.localhost/',
      requests: [
        {
          target: 'test.1.js',
          requestHeaders: {
            'Accept-EncodXng': 'gzip, deflate'
          }
        },
        {
          target: 'test.2.js',
          requestHeaders: {
            'X-cept-Encoding': 'gzip, deflate'
          }
        },
        {
          target: 'test.3.js',
          requestHeaders: {
            'XXXXXXXXXXXXXXX': 'XXXXXXXXXXXXX'
          }
        },
        {
          target: 'test.4.js',
          requestHeaders: {
            '---------------': '-------------'
          }
        },
        {
          target: 'test.5.js',
          requestHeaders: {
            '~~~~~~~~~~~~~~~': '~~~~~~~~~~~~~'
          }
        }
      ]
    }
  ])
}

export default test
