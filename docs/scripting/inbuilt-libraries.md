# Inbuilt Libraries

Below are the list of inbuilt libraries that you can `require`  in your scripts.

- [ajv](https://www.npmjs.com/package/ajv) - Ajv JSON schema validator
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [node-fetch](https://www.npmjs.com/package/node-fetch) - A light-weight module that brings Fetch API to Node.js.
- [atob](https://www.npmjs.com/package/atob) -  Turn base64-encoded ascii data back to binary.
- [btoa](https://www.npmjs.com/package/btoa) -  Turn binary data to base64-encoded ascii.
- [chai](https://www.npmjs.com/package/chai) -  BDD/TDD assertion library for node.js and the browser.
- [lodash](https://lodash.com) -  A modern JavaScript utility library delivering modularity, performance & extras.
- [moment](https://momentjs.com) -  Parse, validate, manipulate, and display dates and times in JavaScript.
- [uuid](https://www.npmjs.com/package/uuid) -  For the creation of RFC4122 UUIDs
- [nanoid](https://www.npmjs.com/package/nanoid) - A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
- [crypto-js](https://www.npmjs.com/package/crypto-js) - JavaScript library of crypto standards.


**Example:**
```javascript
const { nanoid } = require("nanoid");

req.setHeader("transaction-id", nanoid());
```
