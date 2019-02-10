import { options, prepare, test } from './abstract-test.js'

export { options }

export function setup () {
  return prepare([
    {
      name: 'files are served compressed even if the Accept-Encoding is mangled',
      default: {
        responseHeaders: {
          'Cache-Control': 'max-age=31536000, no-transform',
          'Content-Type': 'text/javascript; charset=utf-8'
        }
      },
      requests: {
        'test.1.js': {
          requestHeaders: {
            'Accept-EncodXng': 'gzip, deflate'
          }
        },
        'test.2.js': {
          requestHeaders: {
            'X-cept-Encoding': 'gzip, deflate'
          }
        },
        'test.3.js': {
          requestHeaders: {
            'XXXXXXXXXXXXXXX': 'XXXXXXXXXXXXX'
          }
        },
        'test.4.js': {
          requestHeaders: {
            '---------------': '-------------'
          }
        },
        'test.5.js': {
          requestHeaders: {
            '~~~~~~~~~~~~~~~': '~~~~~~~~~~~~~'
          }
        }
      }
    }
  ])
}

export default test
