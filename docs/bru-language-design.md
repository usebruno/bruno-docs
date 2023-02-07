# Language Design

A Bru file is made up of blocks.
There are two kinds of blocks
- Dictionary block
- Text blocks

### Dictionary block
A dictionary block contains of a set of key value pairs. <br />
```bash
get {
  url: https://api.textlocal.in/send
}

headers {
  content-type: application/json
  Authorization: Bearer 123
  ~transaction-id: {{transactionId}}
}
```
Any key in the dictionary block can be prefixed with `~` to indicate that it is disabled.

### Text block
A text block is a set of lines
```bash
body {
  {
    "hello": "world"
  }
}

tests {
  function onResponse(request, response) {
    expect(response.status).to.equal(200);
  }
}
```





