import { options, prepare, test } from './abstract-test.js'

export { options }

export function setup () {
  return prepare([
    {
      name: 'directory without a default document',
      domain: 'http://server.localhost/',
      requests: ['test/']
    },
    {
      name: 'hidden file & directory',
      domain: 'http://server.localhost/',
      requests: [
        '.hidden_file',
        '.hidden_directory/',
        '.hidden_directory/test.html'
      ]
    },
    {
      name: 'directory without a default document within `/.well-known/`',
      domain: 'http://server.localhost/',
      requests: [
        '.well-known/',
        '.well-known/test/'
      ]
    },
    {
      name: 'hidden file & directory within `/.well-known/`',
      domain: 'http://server.localhost/',
      requests: [
        '.well-known/.hidden_file',
        '.well-known/.hidden_directory/',
        '.well-known/.hidden_directory/test.html'
      ]
    },
    {
      name: 'files that can expose sensitive information',
      domain: 'http://server.localhost/',
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

export default test
