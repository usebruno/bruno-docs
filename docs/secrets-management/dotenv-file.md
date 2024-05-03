# Secrets Management

## DotEnv File

This approach is inspired by commonly used practices to manage secrets in source code.

In this approach all secrets are stored in a `.env` file at the root of the collection folder.

Bruno will automatically load the secrets from this file and make them available to your collection via `process.env.<secret-name>`.

![dot env vars](../public/images/dot-env-vars.png)

Your environment file at `environments/Local.bru` would look like
```groovy
vars {
  host: http://localhost:5005
  jwtToken: {{process.env.JWT_TOKEN}}
}
```

And now you can safely checkin your collection to source control without worrying about exposing your secrets.
Don't forget to add `.env` to your `.gitignore` file.

You can store a `.env.sample` file in your collection folder to help other developers get started with the collection.

## Comments in .env file

The environment file format allows for comments using the hash character (#).  Anything after the hash character will
be ignored by default.  This includes environment variable values.  In order to use values that contain a hash character,
place the value in double-quotes like shown below

```properties
key_name="key_value"
```
