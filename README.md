# npm-extract

npm-extract is a simple utility for generating a shell command for every dependency
found in `package.json` file in current directory.

This may be useful when merging different code projects together - because
just copying entries from one `package.json` file into another would likely lead
to corrupt `package-lock.json` file.

# Installation
**Warning:** no NPM package has been published yet!

After installing via GIT, go to project directory and use terminal command:
```bash
npm run make-global
```

# Sample use case
```bash
cd PROJECT_1
npm-extract > PROJECT/merge.sh
cd PROJECT
sh merge.sh
```

The utility would produce output similar to this:
```bash
npm i -S @rgrove/parse-xml@1.1.1
npm i -S compression@1.7.2
npm i -D mocha@5.2.0
npm i -D chai@4.1.2
```
If there is no `package.json` file in current directory, program will terminate with error.

# License
ISC
