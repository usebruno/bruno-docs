# Javascript API Reference

Here is the complete set of API reference for the scripting feature in Bruno.

## Before Request
This `onRequest` function is used to make changes to requests before they are sent. You can add custom logic here.

### req
Below is the api documentation for the methods available on the `req` object that gets passed in to the `onRequest` method

### `getUrl`
Get the current request url

**Example:**
```javascript
function onRequest(req) {
  let url = req.getUrl();
}
```

### `setUrl`
Get the current request url

**Example:**
```javascript
function onRequest(req) {
  let url = req.setUrl("https://api.github.com/search/repositories?q=vue&order=desc&per_page=10");
}
```

### `getMethod`
Get the current request method

**Example:**
```javascript
function onRequest(req) {
  const method = req.getMethod();
}
```

### `setMethod`
Set the current request method

**Example:**
```javascript
function onRequest(req) {
  req.setMethod("POST");
}
```

### `getHeader`
Get the request header by name

**Example:**
```javascript
function onRequest(req) {
  req.getHeader("transaction-id");
}
```

### `getHeaders`
Get the current request headers

**Example:**
```javascript
function onRequest(req) {
  const headers = req.getHeaders();
}
```

### `setHeader`
Set the request header by name

**Example:**
```javascript
function onRequest(req) {
  req.setHeader( "content-type", "application/json");
}
```

### `setHeaders`
Set the current request headers

**Example:**
```javascript
function onRequest(req) {
  req.setHeaders({
    "content-type": "application/json",
    "transaction-id": "foobar"
  });
}
```

### `getData`
Get the current request body/payload

**Example:**
```javascript
function onRequest(req) {
  const body = req.getData();
}
```

### `setBody`
Set the request body/payload

**Example:**
```javascript
function onRequest(req) {
  req.setBody({
    "username": "john nash",
    "password": "governingdynamics"
  });
}
```
## After Response
This `onResponse` function is used to parse the received response add add additional logic as per your workflow.

### res
Below is the api documentation for the methods available on the `res` object that gets passed in to the `onResponse` method

### `getStatus`
Get the response status

**Example:**
```javascript
function onResponse(res) {
  let status = res.getStatus();
}
```

### `getHeader`
Get the response header by name

**Example:**
```javascript
function onResponse(res) {
  let transactionId = res.getHeader("transaction-id");
}
```

### `getHeaders`
Get the response headers

**Example:**
```javascript
function onResponse(res) {
  let headers = res.getHeaders();
}
```

### `getData`
Get the response data

**Example:**
```javascript
function onResponse(res) {
  let data = res.getData();
}
```

## Environments
Bruno allows you to get and set env variables on the fly.

### `getEnvVar`
Get the environment variable

**Example:**
```javascript
function onRequest(req) {
  let token = bru.getEnvVar("access_token");
}
```
### `setEnvVar`
Set the environment variable

**Example:**
```javascript
function onResponse(res) {
  let data = res.getData();
  let token = bru.setEnvVar("access_token", data.token);
}
```