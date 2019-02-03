import { assert } from './abstract-test.js'
import mime from '../vendor/mime-types.js'
import compressible from '../vendor/compressible.js'

export const options = {
  thresholds: {
    checks: ['rate>=0.5']
  }
}

export function setup () {
  return [
    {
      name: 'files that can expose sensitive information',
      requests: [
        'test.html',
        'test.vtt'
      ]
    }
  ]
}

export default function (data) {
  assert(data, (test, request) => ({
    'is correct MIME-type': (r) => r.headers['Content-Type'] === mime.lookup(request),
    'is correct content-type': (r) => r.headers['Content-Type'] === mime.contentType(request),
    'is correct compression': (r) => r.headers['Content-Encoding'] === (compressible(mime.lookup(request)) ? 'gzip' : undefined),
  }), 'http://server.localhost/')
}
