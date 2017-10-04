# 4G Clinical Test Suite

NOTE: This code is based on the [Protractor Typescript Example](https://github.com/angular/protractor/tree/master/exampleTypescript).

## Getting started

This package.json references the local protractor directory with
`"protractor": "file: ../"`. For the type declarations to work, from
the protractor directory run an `npm install` to generate the declarations
file. If you do not have a `protractor` directory, clone one:

```
cd ..; git clone git@github.com:angular/protractor.git
```

Now install your dependencies:

```
npm install
```

Make sure you have an updated web driver:

```
../protractor/bin/webdriver-manager update
```

## Running Specs

First, start your web driver:

```
../protractor/bin/webdriver-manager start
```

Then you can run your test suite:

```
npm test
```

Specs/Scenarios and spec helpers are in the `specs/` directory.

## Helpful links

* [TypescriptLang.org tutorial](http://www.typescriptlang.org/docs/tutorial.html)
* [TypescriptLang.org tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
* [Typescript gitter](https://gitter.im/Microsoft/TypeScript)
* [Typescript stackoverflow](http://stackoverflow.com/questions/tagged/typescript)
