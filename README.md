# Protractor with Typescript

NOTE: This code is based on the [Protractor Typescript Example](https://github.com/angular/protractor/tree/master/exampleTypescript).

## File organization

```
exampleTypescript/
|- node_modules/       // downloaded node modules
|- tmp/                // compiled javascript output
|
|- .gitignore          // since typescript produces javascript, we should not
|                      // commit javascript to the repo
|- angularPage.ts      // page object example
|- confPageObjects.ts  // configuration for the page objects example
|- package.json        // node dependencies for the project
|- README.md           // this file
|- spec.ts             // spec for the simple protractor example
|- specPageObjects.ts  // spec for the page objects example
|- tsconfig.json       // typescript transpile configuration
```

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

## Helpful links

* [TypescriptLang.org tutorial](http://www.typescriptlang.org/docs/tutorial.html)
* [TypescriptLang.org tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
* [Typescript gitter](https://gitter.im/Microsoft/TypeScript)
* [Typescript stackoverflow](http://stackoverflow.com/questions/tagged/typescript)
