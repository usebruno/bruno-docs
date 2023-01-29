# Javascript API Reference

Here is the complete set of API reference for the testing feature in Bruno.

## Globals
Bruno currently has 6 globals that are available in your test script environment.

### `req`
The request that was sent. <br/>
You can refer [here](../scripting/javascript-reference.html#req) for the complete set of api's available for `req`

### `res`
The response that was received. <br/>
You can refer [here](../scripting/javascript-reference.html#res) for the complete set of api's available for `res`

### `bru`
`bru` allows you to load inbuilt libraries as well as set and get environment variables.<br/>
You can refer [here](../scripting/javascript-reference.html#environments) for the api for setting and getting environment variables and [here](../scripting/inbuilt-libraries.html) to learn how to load inbuilt libraries.


### `test`
The `test` method allows you to write assertions for your api behavior.

**Example:**
```javascript
test("should be able to login", function() {
  const data = res.getData();
  expect(res.getStatus()).to.equal(200);
});
```

### `expect`
Bruno internally uses chaijs library to support bdd style expectations. You can refer the [chaijs site](https://www.chaijs.com/api/bdd) for documentation for the `expect` api

### `assert`
Bruno internally uses chaijs library to support bdd style assertions. You can refer the [chaijs site](https://www.chaijs.com/api/assert) for documentation for the `assert` api