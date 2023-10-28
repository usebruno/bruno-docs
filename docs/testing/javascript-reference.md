# JavaScript API Reference

Here is the complete set of API reference for the testing feature in Bruno.

## Globals
Bruno currently has 6 globals that are available in your test script environment.

### `req`
You can refer [here](../scripting/javascript-reference.md#request) for the complete set of APIs available for `req`

### `res`
You can refer [here](../scripting/javascript-reference.md#response) for the complete set of APIs available for `res`

### `bru`
`bru` allows you to load inbuilt libraries as well as set and get environment variables.<br/>
You can refer [here](../scripting/javascript-reference.html#environments) for the API for setting and getting environment variables and [here](../scripting/inbuilt-libraries.html) to learn how to load inbuilt libraries.

You can refer [here](../scripting/javascript-reference.md#environments) for the API for setting and getting environment variables and [here](../scripting/inbuilt-libraries.md) to learn how to load inbuilt libraries.

### `test`
The `test` method allows you to write assertions for your API behavior.

**Example:**
```javascript
test("should be able to login", function() {
  const data = res.getBody();
  expect(res.getStatus()).to.equal(200);
});
```

### `expect`
Bruno internally uses `chaijs` library to support bdd style expectations. You can refer the [chaijs site](https://www.chaijs.com/api/bdd) for documentation for the `expect` API

### `assert`
Bruno internally uses `chaijs` library to support bdd style assertions. You can refer the [chaijs site](https://www.chaijs.com/api/assert) for documentation for the `assert` API
