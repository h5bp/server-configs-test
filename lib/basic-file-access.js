import { options, prepare, test } from './abstract-test.js'

export { options }

const suite = JSON.parse(open('./basic-file-access.json'))

export function setup () {
  return prepare(suite)
}

export default test
