const path = require('path')
const zlib = require('zlib')
const fs = require('fs-extra')
const mime = require('mime-types')
const compressible = require('compressible')
const testSuites = require('../lib/basic-file-access.json')

const outputDir = 'dist/fixtures'

const errorCb = (err) => {
  if (err) throw err
}

for (const suite of testSuites) {
  for (const request of suite.requests) {
    const file = request.target || request
    const type = request.responseHeaders?.['Content-Type'] || mime.contentType(file)
    let content = {
      'Content-Type': type || null,
      'Content-Encoding': compressible(type) ? 'gzip' : null
    }
    if (suite.default && suite.default.responseHeaders) {
      content = Object.assign(content, suite.default.responseHeaders)
    }
    if (request.responseHeaders) {
      content = Object.assign(content, request.responseHeaders)
    }
    fs.outputJsonSync(`${outputDir}/${file}`, content)
  }
}

fs.outputFile(`${outputDir}/test.svgz`, zlib.gzipSync(fs.readFileSync(`${outputDir}/test.svgz`)), errorCb)

for (const folder of ['/', '.well-known/', '.well-known/test/']) {
  fs.outputFile(`${outputDir}/${folder}.hidden_directory/test.html`, '', errorCb)
}

fs.outputFile(`${outputDir}/test-pre-gzip.js.gz`, zlib.gzipSync(JSON.stringify({
  'Content-Type': 'text/javascript; charset=utf-8',
  'Content-Encoding': 'gzip'
})), errorCb)
fs.outputFile(`${outputDir}/test-pre-brotli.js.br`, zlib.brotliCompressSync(JSON.stringify({
  'Content-Type': 'text/javascript; charset=utf-8',
  'Content-Encoding': 'br'
})), errorCb)

fs.copy(path.join(__dirname, 'pre-fixtures'), outputDir, errorCb)
