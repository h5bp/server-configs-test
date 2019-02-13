# [Test Server Configs](https://github.com/h5bp/server-configs-test)

[![Build Status](https://img.shields.io/travis/h5bp/server-configs-test/master.svg)](https://travis-ci.org/h5bp/server-configs-test)

**Test Server Configs** is a collection of test scripts for server validation.


## Getting Started

This repository contains unit tests suites helping validate correctness of a server.
Some steps are require to make them ready to run.

* Get the files ready by either:
  * Downloading [latest release](https://github.com/h5bp/server-configs-test/releases/latest) build
  * Generating fixtures
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
  * Mount `fixtures/` to be the root of files served by the server
* Run the units (see [Usage](#usage))


## Usage

To run all tests, execute:

```sh
$ k6 run lib/index.js
```

You may want to run only specific test.
Add a environment variable `TESTS` with all wanted test names separated by `:`.
The environment variable can be passed as an argument:

```sh
$ k6 run lib/index.js -e TESTS=basic-file-access:rewrites
```

### Tests

#### `basic-file-access`
   
Check if all common files are served correctly.

The requested file should be serve exactly as expected, all HTTP should be valid.

#### `cache-busting` (common)

Check if cache-busting is working.

The requests that contain a hashed-key extension prefix (`[name].[hash].[ext]`) should serve the target file correctly.

#### `concatenation`

Check if concatenation is working.

The requests for `[name].combined.[ext]` should be served as a concatenation of the `a.[ext]` and `b.[ext]` files.

#### `custom-errors`

Check if errors are served as desired.

The erroneous requests should be served with the custom document provided.

#### `enforce-gzip`

Check if gzip is enable even if mangled headers.

#### `forbidden-files`

Check if forbidden files are well handled.

The requests should be answered with 403 errors when:
* The requested directory does not contain a default document (no file listing);
* The requested directory is hidden (the name start with a dot);
* The requested file is hidden (the name start with a dot);
* The above requests are made in the `.well-known` directory;
* The requested file is known to contain sensitive data.

_Ref:_
* https://www.mnot.net/blog/2010/04/07/well-known
* https://tools.ietf.org/html/rfc5785
* https://feross.org/cmsploit/

#### `precompressed-files-(gzip|brotli)`

Check if server use gzip/brotli precompressed-files if available.

The requests should be served with a valid gzip/brotli file if a precompressed-files is available.

#### `rewrites`

Check redirection behavior.

The redirection should follow the following paths:
* Redirect to no-www when the host is prefixed with `www.` but require not to;
* Redirect to www when the host is not prefixed with `www.` but require to;
* Redirect to www/no-www whichever the connexion is secure or not.
* Always redirect HTTP to HTTPS whatever is the host if secure alternatives exists;

_Ref:_
* https://observatory.mozilla.org/faq/

#### `ssl`

Check correctness for the TLS/SSL configuration.

The requests should be served with:
* A technically valid certificate;
* A secure TLS version;
* A valid and secure cipher suite;
* A secure protocol (HTTP/2);
* With a well formatted HSTS header.

_Ref:_
* https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_configurations
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
* https://tools.ietf.org/html/rfc6797#section-6.1
* https://www.html5rocks.com/en/tutorials/security/transport-layer-security/
* https://blogs.msdn.microsoft.com/ieinternals/2014/08/18/strict-transport-security/
* https://tools.ietf.org/html/rfc7540

#### `benchmark`

Bonus test file to run a load benchmark.
This test is not included in the run-all script.
A separate command is required to run it:

```sh
$ k6 run lib/benchmark.js
```


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
