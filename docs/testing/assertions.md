# Assertions

Assertions allow you to declaratively write tests.

This should cover most of your testing needs. For complex tests, you can write test scripts.

**Example:**
![bru assertions](../public/images/assertions.png)

## Accessing headers
To access HTTP response headers, you can query `res.headers.['xyz]` (whereas `xyz` is the lower-cased header name like `x-powered-by`for example). Be aware that accessing inexistent headers will result in an error, as an inexistent header is not an empty string, but "undefined".
