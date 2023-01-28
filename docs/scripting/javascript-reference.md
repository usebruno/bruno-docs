# Javascript API Reference

Here is the complete set of API reference for the scripting feature in Bruno.

## `onRequest`
This function is used to make changes to requests before they are sent. You can add custom logic here.

**Example:**
```javascript
function onRequest(request) {
  let token = bru.getEnvVar("access_token");
  request.setHeader("Authorization", "Bearer " + token);
}
```

### request
Below is the api documentation for the methods available on the `request` object that gets passed in to the `onRequest` method

### `getUrl`
Get the current request url

**Example:**
```javascript
function onRequest(request) {
  let url = request.getUrl();
}
```

### `setUrl`
Get the current request url

**Example:**
```javascript
function onRequest(request) {
  let url = request.setUrl("https://api.github.com/search/repositories?q=vue&order=desc&per_page=10");
}
```

### `getMethod`
Get the current request method

**Example:**
```javascript
function onRequest(request) {
  const method = request.getMethod();
}
```

### `setMethod`
Set the current request method

**Example:**
```javascript
function onRequest(request) {
  request.setMethod("POST");
}
```

### `getHeader`
Get the request header by name

**Example:**
```javascript
function onRequest(request) {
  request.getHeader("transaction-id");
}
```

### `getHeaders`
Get the current request headers

**Example:**
```javascript
function onRequest(request) {
  const headers = request.getHeaders();
}
```

### `setHeader`
Set the request header by name

**Example:**
```javascript
function onRequest(request) {
  request.setHeader( "content-type", "application/json");
}
```

### `setHeaders`
Set the current request headers

**Example:**
```javascript
function onRequest(request) {
  request.setHeaders({
    "content-type": "application/json",
    "transaction-id": "foobar"
  });
}
```

### `getData`
Get the current request body/payload

**Example:**
```javascript
function onRequest(request) {
  const body = request.getData();
}
```

### `setBody`
Set the request body/payload

**Example:**
```javascript
function onRequest(request) {
  request.setBody({
    "username": "john nash",
    "password": "governingdynamics"
  });
}
```