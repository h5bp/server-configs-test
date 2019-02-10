import { check, group } from 'k6'
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
    for (const prop of Object.keys(test.default || {})) {
      for (const request of Object.keys(test.requests)) {
        test.requests[request][prop] = Object.assign(test.default[prop], test.requests[request][prop] || {})
      }
    }
  }
  return suite
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
        const checks = {
          'is status correct': (r) => r.status === (test.requests[request].statusCode || 200) ||
            report(test.name, r, 'Status', r.status, (test.requests[request].statusCode || 200)),
          'is Server header correct': (r) => r.headers['Server'] === 'nginx'
        }
        const headers = res.status === 200 ? res.json() : {}
        for (const header of Object.keys(headers)) {
          if (headers[header] !== false) {
            checks[`is ${header} header correct`] = (r) => r.headers[header] === (headers[header] || undefined) ||
              report(test.name, r, header, r.headers[header], headers[header])
          }
        }
        check(res, checks)
      }
    })
  }
}

function report (group, r, name, actual, expected) {
  console.warn(`${group}:\nUnexpected ${name} for ${r.request.url}\n\t-${expected}\n\t+${actual}\n`)
}
