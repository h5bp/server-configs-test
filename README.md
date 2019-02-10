# [Test Server Configs](https://github.com/h5bp/server-configs-test)

**Test Server Configs** is a collection of test scripts that can help

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
* Run the unit
  - `k6 run unit/basic-file-access.js`  
     Check if all common files are served correctly.
  - `k6 run unit/benchmark.js`  
     Run a load benchmark.
  - `k6 run unit/cache-busting.js`  
     Check if cache-busting is working.
  - `k6 run unit/custom-errors.js`  
     Check if errors are served as desired.
  - `k6 run unit/forbidden-files.js`  
     Check if forbidden files are well handled.
  - `k6 run unit/precompressed-files.js`  
     Check if server use precompressed-files if available.
  - `k6 run unit/rewrites.js`  
     Check redirection (www/https) behavior.
  - `k6 run unit/ssl.js`  
     Check correctness for the TLS/SSL configuration.

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
