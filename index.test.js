/* eslint-env jest */

const process = require('process')
const cp = require('child_process')
const path = require('path')

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env.INPUT_VERSION = 'true'
  const ip = path.join(__dirname, 'index.js')
  expect(cp.execSync(`node ${ip}`).toString()).toEqual(expect.stringContaining('k6'))
})
