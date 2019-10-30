const path = require('path')
const core = require('@actions/core')
const exec = require('@actions/exec')

async function run () {
  try {
    console.log('Running k6 tests')
    const ut = core.getInput('tests')
    let args = ['run', 'lib/index.js']
    if (Array.isArray(ut) && ut.length > 0) {
      args += [
        '-e',
        `TESTS=${ut.join(':')}`
      ]
    }

    await exec.exec(path.join(process.cwd(), 'bin/k6'), args)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
