# Javascript API Reference

Here is the complete set of API reference for the scripting feature in Bruno.

## Request
This `req` variable is available inside your scripting and testing context.

Below is the api documentation for the methods available on `req` 
### `getUrl`
Get the current request url

**Example:**
```javascript
let url = req.getUrl();
```

### `setUrl`
Set the current request url

**Example:**
```javascript
req.setUrl("https://api.github.com/search/repositories?q=vue");
```

### `getMethod`
Get the current request method

**Example:**
```javascript
const method = req.getMethod();
```

### `setMethod`
Set the current request method

**Example:**
```javascript
req.setMethod("POST");
```

### `getHeader`
Get the request header by name

**Example:**
```javascript
req.getHeader("transaction-id");
```

### `getHeaders`
Get the current request headers

**Example:**
```javascript
const headers = req.getHeaders();
```

### `setHeader`
Set the request header by name

**Example:**
```javascript
req.setHeader( "content-type", "application/json");
```

### `setHeaders`
Set the current request headers

**Example:**
```javascript
req.setHeaders({
  "content-type": "application/json",
  "transaction-id": "foobar"
});
```

### `getBody`
Get the current request body/payload

**Example:**
```javascript
const body = req.getBody();
```

### `setBody`
Set the request body/payload

**Example:**
```javascript
req.setBody({
  "username": "john nash",
  "password": "governingdynamics"
});
```
## Response
This `res` variable is available inside your scripting and testing context.

Below are the properties available on the `res` object.
| Property | Description |
|----------|-------------|
| status | The response status code|
| statusText | The response status text|
| headers | The response headers|
| body | The response body|

Below are the methods available on the `res` object.

### `getStatus`
Get the response status

**Example:**
```javascript
let status = res.getStatus();
```

### `getHeader`
Get the response header by name

**Example:**
```javascript
let transactionId = res.getHeader("transaction-id");
```

### `getHeaders`
Get the response headers

**Example:**
```javascript
let headers = res.getHeaders();
```

### `getBody`
Get the response data

**Example:**
```javascript
let data = res.getBody();
```

## Environments
Bruno allows you to get and set env variables on the fly.

### `getEnvVar`
Get the environment variable

**Example:**
```javascript
let token = bru.getEnvVar("access_token");
```
### `setEnvVar`
Set the environment variable

**Example:**
```javascript
function onResponse(res) {
let data = res.getBody();
let token = bru.setEnvVar("access_token", data.token);
}
```

## Collection Variables
Bruno allows you to get and set collection variables on the fly. The collection variables take precendence over environment variables.

### `getVar`
Get the collection variable

**Example:**
```javascript
let petId = bru.getVar("petId");
```
### `setVar`
Set the collection variable

**Example:**
```javascript
let data = res.getBody();
bru.setVar("petId", data.id);
```
