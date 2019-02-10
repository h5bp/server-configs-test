import { check } from 'k6'
import * as http from 'k6/http'

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '5s' },
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    checks: [{
      threshold: 'rate>0.1',
      abortOnFail: true
    }]
  }
}

export default function () {
  check(http.get('http://server.localhost/test.html'), {
    'is status 200': (r) => r.status === 200
  })
}
