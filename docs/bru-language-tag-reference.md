# Bru Tag Reference

## meta

Store metadata about your request

```
meta {
  name: Get users,
  type: http
  seq: 1
}
```

The `seq` is used to store the sequence number. This decides the sort position of your request in the UI.
The `type` can be either `http` or `graphql`

## get

Make a `GET` http call

```
get {
  url: https://api.github.com/users/usebruno
}
```

## post

Make a `POST` http call

```
post {
  url: https://api.github.com/users/usebruno
}
```

## put

Make a `PUT` http call

```
put {
  url: https://api.github.com/users/usebruno
}
```

## delete

Make a `DELETE` http call

```
delete {
  url: https://api.github.com/users/usebruno
}
```

## options

Make a get `OPTIONS` call

```
options {
  url: https://api.github.com/users/usebruno
}
```

## trace

Make a `TRACE` http call

```
trace {
  url: https://api.github.com/users/usebruno
}
```

## connect

Make a `CONNECT` http call

```
connect {
  url: https://api.github.com/users/usebruno
}
```

## head

Make a `HEAD` http call

```
head {
  url: https://api.github.com/users/usebruno
}
```

## query

The request query params

```
get {
  url: https://api.textlocal.in/send?apiKey=secret&numbers=9988776655&message=hello
}

query {
  apiKey: secret
  numbers: 9988776655
  message: hello
}
```

## headers

The request query headers

```
get {
  url: https://api.textlocal.in/send?apiKey=secret&numbers=9988776655&message=hello
}

headers {
  content-type: application/json
  Authorization: Bearer topsecret
}
```

## body

The request body (defaults to json)

```
body {
  {
    username: 'john',
    password: 'governingdynamics'
  }
}
```

## body:text

The request body as text

```
body:text {
  This is a text body
}
```

## body:xml

The request body as xml

```
body:xml {
  <xml>
    <name>John</name>
    <age>30</age>
  </xml>
}
```

## body:form-urlencoded

The request body as form-urlencoded

```
body:form-urlencoded {
  apikey: secret
  numbers: +91998877665
  ~message: hello
}
```

## body:multipart-form

The request body as multipart-form

```
body:multipart-form {
  apikey: secret
  numbers: +91998877665
  ~message: hello
}
```

## body:graphql

The request body as graphql

```
body:graphql {
  {
    launchesPast {
      launch_site {
        site_name
      }
      launch_success
    }
  }
}
```

## body:graphql:vars

The request body as graphql vars

```
body:graphql:vars {
  {
    "limit": 5
  }
}
```

## script:pre-request

The request body as pre-request

```
script:pre-request {
  req.setHeader("Authorization", "{{token}}");
}
```

## script:post-response

The request body as post-response

```
script:post-response {
  bru.setVar("token", res.body.token);
}
```

## test

The tests

```
body:test {
  expect(res.status).to.equal(200);
}
```
