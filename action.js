// Copyright H5BP
//
// Licensed under the MIT License

import join from 'path'
import * as core from '@actions/core'
import exec from '@actions/exec'
import { DefaultArtifactClient } from '@actions/artifact'

async function action () {
  const command = core.getInput('command', { required: true })
  if (command !== 'test' && command !== 'benchmark') {
    core.setFailed('Invalid command')
  }

  // ------
  core.startGroup('Starting server container')
  const serverArgs = [
    '-v', `${join(__dirname, 'fixtures')}:${core.getInput('root-path', { required: true })}`
  ]
  if (core.getInput('certs-path')) {
    serverArgs.push('-v', `${join(__dirname, '../certs')}:${core.getInput('certs-path')}`)
  } else {
    core.warning('certs-path was not set')
  }
  const volumes = core.getInput('configs-volumes')
    .split(';')
    .filter(val => val !== '')
    .map(vlm => ['-v', `${process.cwd()}/${vlm}`])
  if (volumes.length) {
    serverArgs.push(...volumes.flat())
  }
  serverArgs.push(core.getInput('server', { required: true }))

  try {
    await exec('docker', [
      'run',
      '--detach',
      '-p', '80:80',
      '-p', '443:443',
      '--name', 'server',
      ...serverArgs
    ])
  } catch (e) {
    core.setFailed(e.message)
    process.exit()
  }
  core.endGroup()

  // ------
  core.startGroup('Preparing server-configs-test')
  // ---
  core.debug('Build k6 arguments')
  const k6Args = ['run']
  if (command === 'test') {
    k6Args.push(
      join(__dirname, '../lib/index.js'),
      '-e', `TESTS=${core.getInput('tests')}`
    )
  } else if (command === 'benchmark') {
    k6Args.push(join(__dirname, '../lib/benchmark.js'))
  }
  if (core.isDebug() && command !== 'benchmark') {
    k6Args.push('--http-debug')
  }
  k6Args.push(
    '--summary-export', join(__dirname, '../sct-summary.json'),
    '--out', `json=${join(__dirname, '../sct-results.json')}`
  )
  if (process.env.K6_CLOUD_TOKEN) {
    k6Args.push('--out', 'cloud')
  }
  core.endGroup()

  // ------
  try {
    await exec('k6', k6Args)
  } catch (e) {
    core.setFailed(e.message)
  }

  // ------
  core.startGroup('Shutting down server and dumping logs')
  if (command !== 'benchmark') {
    await exec('docker', ['logs', 'server'])
  }
  await exec('docker', ['kill', 'server'])
  await exec('docker', ['rm', 'server'])
  core.endGroup()

  // ------
  await (new DefaultArtifactClient()).uploadArtifact(
    `sct-${command}-results`,
    [
      join(__dirname, '../sct-results.json'),
      join(__dirname, '../sct-summary.json')
    ],
    join(__dirname, '..'),
    { continueOnError: true }
  )
}

action()
