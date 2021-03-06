![Build](https://github.com/SaenkoJr/backend-project-lvl2/workflows/CI/badge.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/8df6343b6d672afb878b/maintainability)](https://codeclimate.com/github/SaenkoJr/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8df6343b6d672afb878b/test_coverage)](https://codeclimate.com/github/SaenkoJr/backend-project-lvl2/test_coverage)

# Generate diff

Compares two configuration files and shows a difference.

## Setup

Clone repository
```sh
git clone git@github.com:SaenkoJr/backend-project-lvl2.git
```

Install deps
```sh
make install
```
or
```sh
npm install diff-saenkomm
```

## Usage
```sh
$ gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -v, --version        output the version number
  -f, --format [type]  specify output format: pretty, plain, json (default: "pretty")
  -h, --help           output usage information
```

## Examples

Pretty format

[![asciicast](https://asciinema.org/a/qLctRmGJAJ6duiumrTGPzHP6F.svg)](https://asciinema.org/a/qLctRmGJAJ6duiumrTGPzHP6F)

Plain format

[![asciicast](https://asciinema.org/a/H0gFQVssJC08YwPLOyILcroHi.svg)](https://asciinema.org/a/H0gFQVssJC08YwPLOyILcroHi)

Json format

[![asciicast](https://asciinema.org/a/z0Oh5d4NfDzbjwrOsJWheEBTs.svg)](https://asciinema.org/a/z0Oh5d4NfDzbjwrOsJWheEBTs)
