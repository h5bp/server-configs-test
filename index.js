/**
 * H5BP Server Configs Test GitHub Actions
 *
 */

const path = require('path')
const core = require('@actions/core')
const exec = require('@actions/exec')

const uts = [
  'version',
  'basic-file-access',
  'caching',
  'cache-busting',
  'concatenation',
  'custom-errors',
  'forbidden-files',
  'rewrites',
  'ssl',
  'enforce-gzip',
  'precompressed-files-gzip',
  'precompressed-files-brotli'
]

async function execute (args) {
  await exec.exec(path.join(process.cwd(), 'bin/k6'), args)
}

async function run () {
  try {
    console.log('Running k6 tests')
    uts.filter(name => core.getInput(name) && core.getInput(name) !== 'false')

    core.debug(uts.join(':'))

    if (uts.includes('version')) {
      uts.splice(uts.indexOf('version'), 1)
      await execute(['version'])
      return
    }
    if (uts.length === 0) {
      return
    }

    await execute(['run', 'lib/index.js', '-e', `TESTS=${uts.join(':')}`])
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
