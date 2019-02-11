import { options, prepare, test } from './abstract-test.js'

export { options }

export function setup () {
  return prepare([
    {
      name: 'filename-based cache busting works',
      domain: 'http://server.localhost/',
      default: {
        requestHeaders: {
          'Accept-Encoding': 'gzip, deflate'
        }
      },
      requests: [
        'test.12345.css',
        'test.12345.js',
        'test.12345.bmp',
        'test.12345.gif',
        'test.12345.ico',
        'test.12345.jpeg',
        'test.12345.jpg',
        'test.12345.png',
        'test.12345.svg',
        'test.12345.svgz',
        'test.12345.webp',
        'test.12345.webmanifest'
      ]
    }
  ])
}

export default test