# eslint-plugin-no-catch-all

It is very easy to accidentally swallow errors with catch blocks, that should just crash because they are a simple developer error. Consider this case for example.

```js
try {
  someFunctionWhichMayThrowSpecificError();
  // a stupid mistake
  let obj;
  if (obj.prop === "something") {
    // do something
  }
} catch (e) {
  // code to handle one specific error case
}
```

This error swallowing can be a real pain and lead to hard to debug issues that would otherwise be trivial to catch. Instead the catch block should always try to identify the specific error by checking for some specific prop that is set in the error constuctor or simply matching a string in the error message like so:

```js
try {
  someFunctionWhichMayThrowSpecificError();
  // a stupid mistake
  let obj;
  if (obj.prop === "something") {
    // do something
  }
} catch (e) {
  if (e.networkError) {
    // code to handle one specific error case
  } else throw e;
}
```

This plugin provides a simple eslint rule to warn about catch blocks that don't rethrow. Of course there might sometimes be good reasons to catch all, but in those cases a simple `// eslint-disable-next-line no-catch-all/no-catch-all` will make the intention known better.

## Configuration

Install the module via `yarn add -D eslint-plugin-no-catch-all" or "npm install --save-dev eslint-plugin-no-catch-all". Than configure it in your eslintrc file like so:

```json
{
	...,
	"plugins": [
		...,
		"no-catch-all"
	],
	"rules": {
		...,
		"no-catch-all/no-catch-all": "warn"
	}
}
```
