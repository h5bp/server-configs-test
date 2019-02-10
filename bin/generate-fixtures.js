const path = require('path')
const zlib = require('zlib')
const fs = require('fs-extra')
const mime = require('mime-types')
const compressible = require('compressible')
const testSuites = require('../unit/basic-file-access.json')

const errorCb = (err) => {
  if (err) throw err
}

for (const suite of testSuites) {
  for (const request of Object.keys(suite.requests)) {
    let content = {}
    const type = mime.contentType(request)
    content = Object.assign(content, {
      'Content-Type': type || null,
      'Content-Encoding': compressible(type) ? 'gzip' : null
    })
    if (suite.default && suite.default.responseHeaders) {
      content = Object.assign(content, suite.default.responseHeaders)
    }
    if (suite.requests[request].responseHeaders) {
      content = Object.assign(content, suite.requests[request].responseHeaders)
    }
    fs.outputFile(`fixtures/${request}`, JSON.stringify(content), errorCb)
  }
}

for (const folder of ['/', '.well-known/', '.well-known/test/']) {
  fs.outputFile(`fixtures/${folder}.hidden_directory/test.html`, '', (err) => {
    if (err) throw err
  })
}

fs.outputFile(`fixtures/test-pre-gzip.js.gz`, zlib.gzipSync(JSON.stringify({
  'Content-Type': 'text/javascript; charset=utf-8',
  'Content-Encoding': 'gzip'
})), errorCb)
fs.outputFile(`fixtures/test-pre-gzip.js.br`, zlib.brotliCompressSync(JSON.stringify({
  'Content-Type': 'text/javascript; charset=utf-8',
  'Content-Encoding': 'br'
})), errorCb)

fs.copy(path.join(__dirname, 'extra'), 'fixtures', errorCb)
