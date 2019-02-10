# [Test Server Configs](https://github.com/h5bp/server-configs-test)

[![Build Status](https://img.shields.io/travis/h5bp/server-configs-test/master.svg)](https://travis-ci.org/h5bp/server-configs-test)

**Test Server Configs** is a collection of test scripts for server validation.


## Getting Started

This repository contains unit tests suites helping validate correctness of a server.

These tests follow standard recommendations from recognized institutions like IETF and W3C.

### `basic-file-access.js`
   
Check if all common files are served correctly.

### `cache-busting.js`

Check if cache-busting is working.

### `custom-errors.js`

Check if errors are served as desired.

### `forbidden-files.js`

Check if forbidden files are well handled.

### `precompressed-files.js`

Check if server use precompressed-files if available.

### `rewrites.js`

Check redirection (www/https) behavior.

### `ssl.js`

Check correctness for the TLS/SSL configuration.

### `benchmark.js`

Bonus test file to run a load benchmark.

     
## Usage

* Download latest release build
  * Or generate fixture
    ```
    npm install
    npm run build
    ```
* Install [k6](https://k6.io/)
* Setup the server, local or Docker
  * Add these hosts:
    - `server.localhost`
    - `www.server.localhost`
    - `secure.server.localhost`
    - `www.secure.server.localhost`
  * Secure `secure.` hosts, possibly with certs within `certs/`
  * Mount `fixtures/` to be the root of the hosts
* Run the units
  * `k6 run unit/index.js` (run all)
  * `k6 run unit/[unit].js`


## Contributing

Anyone is welcome to [contribute](.github/CONTRIBUTING.md),
however, if you decide to get involved, please take a moment to review
the [guidelines](.github/CONTRIBUTING.md):

* [Bug reports](.github/CONTRIBUTING.md#bugs)
* [Feature requests](.github/CONTRIBUTING.md#features)
* [Pull requests](.github/CONTRIBUTING.md#pull-requests)


## Acknowledgements

[Test Server Configs](https://github.com/h5bp/server-configs-test) is only possible thanks to all the awesome
[contributors](https://github.com/h5bp/server-configs-test/graphs/contributors)!


## License

The code is available under the [MIT license](LICENSE.txt).
