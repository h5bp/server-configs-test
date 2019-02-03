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
        check(http.get(`${prefix}${request}`), checks(test, request))
      }
    })
  }
}
