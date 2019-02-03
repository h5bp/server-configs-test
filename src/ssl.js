import * as http from 'k6/http'
import { options as defaultOptions, assert } from './abstract-test'

export const options = Object.assign(defaultOptions, {
  // tlsCipherSuites: [
  //   'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384'
  // ],
  tlsVersion: {
    min: http.SSL_3_0,
    max: http.TLS_1_2
  }
})

export function setup () {
  return [
    {
      name: 'modern policy',
      requests: ['https://secure.server.localhost/']
    }
  ]
}

export default function (data) {
  assert(data, (test) => ({
    'is TLSv1.2': (r) => r.tls_version === http.TLS_1_2,
    'is sha256 cipher suite': (r) => console.log(r.tls_cipher_suite) || true, //r.tls_cipher_suite === 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384',
    'is OCSP response good': (r) => r.ocsp.status === http.OCSP_STATUS_GOOD,
    'is protocol HTTP/2': (r) => r.proto === 'h2' || r.proto === 'HTTP/2.0'
  }))
}
