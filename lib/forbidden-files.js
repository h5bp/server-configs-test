import { options, prepare, assert } from './abstract-test.js'

export { options }

export function setup () {
  return prepare([
    {
      name: 'directory without a default document',
      requests: ['test/']
    },
    {
      name: 'hidden file & directory',
      requests: [
        '.hidden_file',
        '.hidden_directory/',
        '.hidden_directory/test.html'
      ]
    },
    {
      name: 'directory without a default document within `/.well-known/`',
      requests: [
        '.well-known/',
        '.well-known/test/'
      ]
    },
    {
      name: 'hidden file & directory within `/.well-known/`',
      requests: [
        '.well-known/.hidden_file',
        '.well-known/.hidden_directory/',
        '.well-known/.hidden_directory/test.html'
      ]
    },
    {
      name: 'files that can expose sensitive information',
      requests: [
        '%23test%23',
        'test.bak',
        'test.conf',
        'test.dist',
        'test.fla',
        'test.inc',
        'test.ini',
        'test.log',
        'test.psd',
        'test.sh',
        'test.sql',
        'test.swo',
        'test.swp'
      ]
    }
  ])
}

export default function (data) {
  assert(data, 'http://server.localhost/', () => ({
    'is status 403': (r) => r.status === 403
  }))
}
