import http from 'k6/http'
import { options as defaultOptions, prepare, assert } from './abstract-test.js'

export const options = Object.assign(defaultOptions, {
  tlsVersion: {
    min: http.SSL_3_0,
    max: http.TLS_1_3
  }
})

export function setup () {
  return prepare([
    {
      name: 'intermediate policy',
      requests: ['https://secure.server.localhost/']
    }
  ])
}

export default function (data) {
  assert(data, '', () => ({
    'is TLS version secure': (r) => r.tls_version === http.TLS_1_2 || r.tls_version === http.TLS_1_3,
    // 'is cipher suite secure': (r) => r.tls_cipher_suite === 'TLS_CHACHA20_POLY1305_SHA256',
    // 'is OCSP response good': (r) => r.ocsp.status === http.OCSP_STATUS_GOOD,
    'is protocol HTTP/2': (r) => r.proto === 'h2' || r.proto === 'HTTP/2.0',
    'is Strict-Transport-Security header correct': (r) => (r.headers['Strict-Transport-Security'] || '').startsWith('max-age=16070400; includeSubDomains')
  }))
}
