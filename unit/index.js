import { group } from 'k6'
import { options } from './abstract-test.js'
import * as basicFileAccess from './basic-file-access.js'
import * as cacheBusting from './cache-busting.js'
import * as customErrors from './custom-errors.js'
import * as forbiddenFiles from './forbidden-files.js'
import * as precompressedFiles from './precompressed-files.js'
import * as rewrites from './rewrites.js'
import * as ssl from './ssl.js'

export { options }

export function setup () {
  return {
    basicFileAccess: {
      name: 'check basic file access',
      setup: basicFileAccess.setup()
      // fn: basicFileAccess.default
    },
    cacheBusting: {
      name: 'check cache busting',
      setup: cacheBusting.setup()
      // fn: cacheBusting.default
    },
    customErrors: {
      name: 'check custom errors',
      setup: customErrors.setup()
      // fn: customErrors.default
    },
    forbiddenFiles: {
      name: 'check forbidden files',
      setup: forbiddenFiles.setup()
      // fn: forbiddenFiles.default
    },
    precompressedFiles: {
      name: 'check precompressed files',
      setup: precompressedFiles.setup()
      // fn: precompressedFiles.default
    },
    rewrites: {
      name: 'check rewrites',
      setup: rewrites.setup()
      // fn: rewrites.default
    },
    ssl: {
      name: 'check ssl/tls',
      setup: ssl.setup()
      // fn: ssl.default
    }
  }
}

export default function (units) {
  // for (const unit of units) {
  //   group(unit.name, () => {
  //     unit.fn(unit.setup)
  //   })
  // }
  group(units.basicFileAccess.name, () => basicFileAccess.default(units.basicFileAccess.setup))
  group(units.cacheBusting.name, () => cacheBusting.default(units.cacheBusting.setup))
  group(units.customErrors.name, () => customErrors.default(units.customErrors.setup))
  group(units.forbiddenFiles.name, () => forbiddenFiles.default(units.forbiddenFiles.setup))
  group(units.precompressedFiles.name, () => precompressedFiles.default(units.precompressedFiles.setup))
  group(units.rewrites.name, () => rewrites.default(units.rewrites.setup))
  group(units.ssl.name, () => ssl.default(units.ssl.setup))
}
