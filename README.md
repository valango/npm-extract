# npm-extract

npm-extract is a simple utility for generation shell command for every dependency
in `package.json` file in current directory.

This may be useful when merging different code projects together - because
just copying entries from one `package.json` file into another would likely lead
to corrupt `package-lock.json` file.

# Installation
**Warning:** this chapter is a stub - no NPM package has been published yet!

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install -g npm-extract
```

# Usage

```bash
npm-extract
```
This command would send something like the sample below into standard output, or
exit with error, if there is no `package.json` file in current directory.
```bash
npm i -S @rgrove/parse-xml@1.1.1
npm i -S compression@1.7.2
npm i -D mocha@5.2.0
npm i -D chai@4.1.2
```
