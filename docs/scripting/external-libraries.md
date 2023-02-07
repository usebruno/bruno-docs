# External Libraries

Bruno supports loading any npm module to use in your scripting workflows.

You need to add a `package.json` file where your collection is stored.
```javascript
{
  "name": "github-rest-api-collection",
  "version": "1.0.0",
  "main": "index.js",
  "homepage": "https://github.com/usebruno/github-rest-api-collection#readme",
  "dependencies": {
    "date-fns": "2.29.3"
  }
}
```

And then run npm install inside your collection folder
```bash
npm install
```

And then you can require the node module in your script as usual.
**Example:**
```javascript
const { faker } = require('@faker-js/faker');

const randomName = faker.name.fullName();
const randomEmail = faker.internet.email();

request.setData({
  name: randomName,
  email: randomEmail
});
```
