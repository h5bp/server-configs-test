import { check } from 'k6'
import * as http from 'k6/http'

export const options = {
  thresholds: {
    checks: ['rate>=1']
  }
}

export function setup () {
  return {}
}

export default function (data) {

}

export function teardown (data) {

}
