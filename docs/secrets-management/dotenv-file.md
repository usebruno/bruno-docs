# Secrets Management

## DotEnv File

This approach is inspired by how developers usually manage secrets in their source code.

In this approach,
**you can store all your secrets in a
`.env`
file at the root of your collection folder**.

Bruno will automatically load the secrets from this file
and make them available to your collection via
`process.env.<secret-name>`.

![dot env vars](../public/images/dot-env-vars.png)

Your environment file at
`environments/Local.bru`
would look like:
```groovy
vars {
  host: http://localhost:5005
  jwtToken: {{process.env.JWT_TOKEN}}
}
```

And now you can safely check in your collection to source control without worrying about exposing your secrets.

⚠️ Don't forget to add
`.env`
to your
`.gitignore`
file.

You can also store a
`.env.sample`
file in your collection folder to help other developers get started with the collection.

### Handling multiple environments

If you want to have a secret that is different per environment, you can use a prefix strategy:

In
`.env`:
```.env
LOCAL_ACCESS_KEY_ID=123
LOCAL_SECRET_ACCESS_KEY="localKey"

PROD_ACCESS_KEY_ID=456
PROD_SECRET_ACCESS_KEY="productionKey"
```

In
`environments/Local.bru`:
```groovy
vars {
  ACCESS_KEY_ID: {{process.env.LOCAL_ACCESS_KEY_ID}}
  SECRET_ACCESS_KEY: {{process.env.LOCAL_SECRET_ACCESS_KEY}}
}
```

In
`environments/Production.bru`:
```groovy
vars {
  ACCESS_KEY_ID: {{process.env.PROD_ACCESS_KEY_ID}}
  SECRET_ACCESS_KEY: {{process.env.PROD_SECRET_ACCESS_KEY}}
}
```
