# npm-extract

npm-extract is a simple utility for generating a shell command for every dependency
found in `package.json` file in current directory.

This may be useful when merging different code projects together - because
just copying entries from one `package.json` file into another would likely lead
to corrupt `package-lock.json` file.

**NOTE:** Please let me know, if there is similar utility published via NPM already!
I was'nt able to find such so, being in hurry, I wrote this one.

# Installation
**Warning:** no NPM package has been published yet!

Global installation: `npm i -g https://github.com/valango/npm-extract` will make
terminal command `npm-extract` readily available. Local install may be useful via `npx`.

# Sample use case
```bash
npm-extract < ANOTHERPOJECT/package.json > merge.sh
sh merge.sh
```

The utility will send to _`stdout`_  results similar to this:
```bash
npm i -S @rgrove/parse-xml@1.1.1 # =1.1.1
npm i -S compression@1.7.2       # ^1.7.2
npm i -D mocha@5.2.0   # ^5.2.0
npm i -D chai@4.1.2    # ^4.1.2
```

The utility will check _`stdin`_ and if there is nothing there, it will read
`package.json` file in current directory. 
If both fail, then comments describing the problem will be produced.

# License
ISC
