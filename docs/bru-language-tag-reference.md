# Bru Tag Reference

### Inline Tags

|Name  | Description |
|------|-------------|
|name  | The name of the api request |
|method| The http request method Ex: GET, POST|
|url| The http request url|
|http-request| The request type. Allowed values: http-request, graphql-request|
|body-mode | The body data type. Allowed values: json,text,xml,form-urlencoded,multipart-form,none,graphql|
|seq | The sort position of the request in bruno editor |

### Block Tags

|Name  | Description |
|------|-------------|
| header | The request headers.<br /> Each line represents a triple. &lt;enabled&gt;&lt;name&gt;&lt;value&gt; <br /><br /> Ex: 1 content-type application/json|
| params | The request url params.<br /> Each line represents a triple. &lt;enabled&gt;&lt;name&gt;&lt;value&gt; <br /><br /> Ex: 1 search react|
| body | The body of the request |
| script | The script to be run for the request. Check the Scripting docs. |
| tests | The tests to be run for the request. Check the Testing docs. |

