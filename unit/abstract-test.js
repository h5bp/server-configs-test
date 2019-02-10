import { check, group } from 'k6'
import * as http from 'k6/http'

export const options = {
  thresholds: {
    checks: ['rate>=1']
  },
  insecureSkipTLSVerify: true
}

export function assert (tests, checks, prefix = '') {
  for (const test of tests) {
    group(test.name, () => {
      for (const request of test.requests) {
        check(http.get(`${prefix}${request}`), checks(test))
      }
    })
  }
}

export function test (data) {
  for (const test of data) {
    group(test.name, () => {
      for (const request of Object.keys(test.requests)) {
        const res = http.get(`http://server.localhost/${request}`, {
          headers: test.requests[request].requestHeaders || {}
        })
        check(res, {
          'is status correct': (r) => r.status === (test.requests[request].statusCode || 200)
        })
        if (res.status === 200) {
          const headers = res.json()
          const checks = {}
          for (const header of Object.keys(headers)) {
            if (headers[header] === false) {
              break
            }
            checks[`is ${header} header correct`] = (r) => r.headers[header] === (headers[header] || undefined) ||
              console.log(r.headers['Content-Type'], header, r.headers[header], headers[header])
          }
          checks[`is Server header correct`] = (r) => r.headers['Server'] === 'nginx'
          check(res, checks)
        }
      }
    })
  }
}
