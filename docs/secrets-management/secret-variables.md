# Secrets Management

## Secret Variables

In this approach, you can check the `secret` checkbox for any variable in your environment.

Bruno will manage your secrets internally and will not write them into the environment file.

![secret variables](../public/images/secret-variables.png)

Your environment file at `environments/Local.bru` would look like
```groovy
vars {
  host: http://localhost:5005
}
vars:secret [
  jwtToken
]

```

And now you can safely checkin your collection to source control without worrying about exposing your secrets.

When you export your collection as a file, Bruno will not export the secret variables.
