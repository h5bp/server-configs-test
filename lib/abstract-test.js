import { check, fail, group } from 'k6'
import * as http from 'k6/http'

export const options = {
  thresholds: {
    checks: ['rate>=1']
  },
  insecureSkipTLSVerify: true,
  maxRedirects: 0
}

export function prepare (suite) {
  for (const test of suite) {
    test.requests = test.requests.map(request => {
      if (typeof request === 'string') {
        request = { target: request }
      }
      if (test.domain) {
        request.target = `${test.domain}${request.target}`
      }
      // Deep merge with default
      for (const key in test.default) {
        if (Object.prototype.hasOwnProperty.call(test.default, key)) {
          if (typeof test.default[key] === 'object') {
            request[key] = Object.assign({}, test.default[key], request[key] || {})
          } else {
            request[key] = request[key] || test.default[key]
          }
        }
      }
      return request
    })
  }
  return suite
}

export function assert (tests, prefix, cb) {
  for (const test of tests) {
    group(test.name, () => {
      for (const request of test.requests) {
        const response = http.get(`${prefix}${request.target}`, {
          headers: request.requestHeaders || {}
        })
        check(response, cb(request, response))
      }
    })
  }
}

export function test (data) {
  assert(data, '', (request, response) => {
    const headers = response.status === 200
      ? response.json() || fail('Unexpected response body')
      : request.responseHeaders || {}
    const checks = {
      'is status correct': (r) => isEqual(r, 'Status', r.status, (request.statusCode || 200)),
      'is Server header correct': (r) => r.headers.Server && r.headers.Server.match(/^[a-z]+$/i)
    }
    for (const header of Object.keys(headers)) {
      // Ignored header: headers[header] => false
      // Existence test: headers[header] => true
      // Absence test:   headers[header] => null
      // Full text test: headers[header] => "value"
      if (headers[header] !== false) {
        checks[`is ${header} header correct`] = (r) => isEqual(
          r,
          header,
          headers[header] === true ? Object.prototype.hasOwnProperty.call(r.headers, header) : r.headers[header],
          (headers[header] || undefined)
        )
      }
    }
    return checks
  })
}

export function isEqual (r, name, actual, expected) {
  return (actual === expected) ||
    (console.warn(`Unexpected ${name} for ${r.request.url}\n\t-${expected}\n\t+${actual}\n`) && false)
}
