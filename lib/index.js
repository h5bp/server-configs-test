import { group } from 'k6'
import { options, prepare, test } from './abstract-test.js'

import * as caching from './caching.js'
import * as concatenation from './concatenation.js'
import * as customErrors from './custom-errors.js'
import * as forbiddenFiles from './forbidden-files.js'
import * as ssl from './ssl.js'

const basicFileAccess = JSON.parse(open('./basic-file-access.json'))
const cacheBusting = JSON.parse(open('./cache-busting.json'))
const precompressedFileBrotli = JSON.parse(open('./precompressed-files-brotli.json'))
const precompressedFileGzip = JSON.parse(open('./precompressed-files-gzip.json'))
const enforceGzip = JSON.parse(open('./enforce-gzip.json'))
const rewrites = JSON.parse(open('./rewrites.json'))

export { options }

export function setup () {
  const suites = [
    {
      id: 'basic-file-access',
      name: 'check file access',
      setup: prepare(basicFileAccess)
    },
    {
      id: 'caching',
      name: 'check file features',
      setup: caching.setup()
    },
    {
      id: 'cache-busting',
      name: 'check file features',
      setup: prepare(cacheBusting)
    },
    {
      id: 'concatenation',
      name: 'check file features',
      setup: concatenation.setup(),
      fn: 'concatenation'
    },
    {
      id: 'custom-errors',
      name: 'check custom errors',
      setup: customErrors.setup(),
      fn: 'customErrors'
    },
    {
      id: 'forbidden-files',
      name: 'check file access',
      setup: forbiddenFiles.setup(),
      fn: 'forbiddenFiles'
    },
    {
      id: 'rewrites',
      name: 'check rewrites',
      setup: prepare(rewrites)
    },
    {
      id: 'ssl',
      name: 'check security',
      setup: ssl.setup(),
      fn: 'ssl'
    },
    {
      id: 'enforce-gzip',
      name: 'check files are served compressed',
      setup: prepare(enforceGzip)
    },
    {
      id: 'precompressed-files-gzip',
      name: 'check files are served compressed',
      setup: prepare(precompressedFileGzip)
    },
    {
      id: 'precompressed-files-brotli',
      name: 'check files are served compressed',
      setup: prepare(precompressedFileBrotli)
    }
  ]
  if (__ENV.TESTS) {
    const filter = __ENV.TESTS.split(/[:;,]/).map(test => test.trim())
    return suites.filter(suite => filter.includes(suite.id))
  }
  return suites
}

export default function (units) {
  for (const lib of units) {
    // k6 do not know how to store function in object yet
    // https://github.com/loadimpact/k6/issues/855
    // eslint-disable-next-line no-eval
    group(lib.name, () => (lib.fn ? eval(lib.fn).default : test)(lib.setup))
  }
}
