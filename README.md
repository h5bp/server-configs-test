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

To run only specific tests, use the environment variable `TESTS` with all wanted test names separated by `:` as value.

The environment variable can be passed as an argument:

```sh
$ k6 run lib/index.js -e TESTS=basic-file-access:rewrites
```

### Tests

#### `basic-file-access`
   
Check if all common files are served correctly.

The requested file should be serve exactly as expected, all HTTP headers should be valid.

<details>
<summary>References</summary>

* https://www.iana.org/assignments/media-types/media-types.xhtml
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
* https://enable-cors.org/
* https://www.w3.org/TR/cors/
* https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
* https://blog.chromium.org/2011/07/using-cross-domain-images-in-webgl-and.html
* https://developers.google.com/fonts/docs/troubleshooting
* https://msdn.microsoft.com/en-us/library/ie/bg182625.aspx#docmode
* https://blogs.msdn.microsoft.com/ie/2014/04/02/stay-up-to-date-with-enterprise-mode-for-internet-explorer-11/
* https://msdn.microsoft.com/en-us/library/ff955275.aspx
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
* https://www.w3.org/TR/CSP3/
* https://content-security-policy.com/
* https://www.html5rocks.com/en/tutorials/security/content-security-policy/
* https://scotthelme.co.uk/a-new-security-header-referrer-policy/
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
* https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/
* https://mimesniff.spec.whatwg.org/
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
* https://tools.ietf.org/html/rfc7034
* https://blogs.msdn.microsoft.com/ieinternals/2010/03/30/combating-clickjacking-with-x-frame-options/
* https://www.owasp.org/index.php/Clickjacking
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
* https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-iv-the-xss-filter/
* https://blogs.msdn.microsoft.com/ieinternals/2011/01/31/controlling-the-xss-filter/
* https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29
</details>

#### `cache-busting`

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

<details>
<summary>References</summary>

* https://www.mnot.net/blog/2010/04/07/well-known
* https://tools.ietf.org/html/rfc5785
* https://feross.org/cmsploit/
</details>


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

<details>
<summary>References</summary>

* https://observatory.mozilla.org/faq/
</details>

#### `ssl`

Check correctness for the TLS/SSL configuration.

The requests should be served with:
* A technically valid certificate;
* A secure TLS version;
* A valid and secure cipher suite;
* A secure protocol (HTTP/2);
* With a well formatted HSTS header.

<details>
<summary>References</summary>

* https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_configurations
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
* https://tools.ietf.org/html/rfc6797#section-6.1
* https://www.html5rocks.com/en/tutorials/security/transport-layer-security/
* https://blogs.msdn.microsoft.com/ieinternals/2014/08/18/strict-transport-security/
* https://tools.ietf.org/html/rfc7540
</details>

#### `benchmark`

Bonus test file to run a load benchmark.
This test is not included in the run-all script.
A separate command is required to run it:

```sh
$ k6 run lib/benchmark.js
```


## Suite Structure

```json
[
  {
    "name": "unit tests suite 1",
    "domain": "http://server.localhost/ (optional)",
    "default": { // optional default values
      "requestHeaders": {
        "Header-Name": "header to add to all the requests"
      },
      "responseHeaders": {
        "Header-Name": "header and its value to test for all the requests"
      },
      "statusCode": 311, // status to validate for all the requests
    },
    "requests": [
      "request1", // use only default values
      {
        "target": "request2",
        "responseHeaders": {
          "Header-Name": "custom header and its value to test for this request"
        }
      }
    ]
  }
]
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
