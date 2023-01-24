# Language Design

The language has been designed to store information about your api requests.<br />


There are two kind of tags in bru
- Inline Tags
- Block Tags

Inline Tags start with a tag name (ex: name, method, url) followed by the value. <br />
```yaml
name Search Repos
method GET
url {{baseUrl}}/search/repositories?q=react&order=desc&per_page=10
```

Block Tags are multiline tags within begin and end tags
```javascript
headers
  1 content-type application/json
  1 transaction-id 9988776655
/headers
```

Certain block tags like can be annotated with additional metadata for increased fidelity.
```javascript
body(type=json)
  {
    name: "John",
    age: 21
  }
/body
```





