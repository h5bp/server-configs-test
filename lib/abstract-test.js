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
    test.requests = test.requests.map(request => {
      if (typeof request === 'string') {
        request = { target: request }
      }
      if (test.domain) {
        request['target'] = `${test.domain}${request.target}`
      }
      return Object.assign(test.default || {}, request)
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
        const headers = response.status === 200 ? response.json() : request.responseHeaders || {}
        check(response, cb(request, headers))
      }
    })
  }
}

export function test (data) {
  assert(data, '', (request, headers) => {
    const checks = {
      'is status correct': (r) => r.status === (request.statusCode || 200) ||
        report(r, 'Status', r.status, (request.statusCode || 200)),
      'is Server header correct': (r) => r.headers['Server'] && r.headers['Server'].match(/^[a-z]+$/i)
    }
    for (const header of Object.keys(headers)) {
      if (headers[header] !== false) {
        checks[`is ${header} header correct`] = (r) => r.headers[header] === (headers[header] || undefined) ||
          report(r, header, r.headers[header], headers[header])
      }
    }
    return checks
  })
}

function report (r, name, actual, expected) {
  console.warn(`Unexpected ${name} for ${r.request.url}\n\t-${expected}\n\t+${actual}\n`)
}