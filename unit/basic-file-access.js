import { options, test } from './abstract-test.js'

export { options }

const suite = JSON.parse(open('./basic-file-access.json'))

export function setup () {
  for (const test of suite) {
    for (const prop of Object.keys(test.default || {})) {
      for (const request of Object.keys(test.requests)) {
        test.requests[request][prop] = Object.assign(test.default[prop], test.requests[request][prop] || {})
      }
    }
  }
  return suite
}

export default test
