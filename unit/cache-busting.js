import { options, test } from './abstract-test.js'

export { options }

export function setup () {
  const suite = [
    {
      name: 'filename-based cache busting works',
      default: {
        requestHeaders: {
          'Accept-Encoding': 'gzip, deflate'
        }
      },
      requests: {
        'test.12345.css': {},
        'test.12345.js': {},
        'test.12345.bmp': {},
        'test.12345.cur': {},
        'test.12345.gif': {},
        'test.12345.ico': {},
        'test.12345.jpeg': {},
        'test.12345.jpg': {},
        'test.12345.png': {},
        'test.12345.svg': {},
        'test.12345.svgz': {},
        'test.12345.webp': {},
        'test.12345.webmanifest': {}
      }
    }
    // {
    //   name: 'file concatenation works',
    //   requests: {
    //     'a_and_b.combined.js': {
    //       responseBody: ''
    //     },
    //     'a_and_b.combined.css': {
    //       responseBody: ''
    //     }
    //   }
    // }
  ]
  for (const test of suite) {
    for (const prop of Object.keys(test.default || {})) {
      for (const request of Object.keys(test.requests)) {
        test.requests[request][prop] = Object.assign(test.default[prop], test.requests[request][prop] || {})
      }
    }
  }
  return suite
}

export default test
