# Bearer token example

If your API requires you to use a bearer token, you might want to use a script like this in the _Post Response_ scripting section:

```javascript
bru.setVar("token", res.body.access_token);
```

With this method, you can then use the `{{token}}` variable in other requests. Just select _Bearer Token_ in the _Auth_ tab and insert your variable.

## String splitting

If the authentication API does not deliver a JSON response but rather a singe string that looks like this `"Bearer FOOBAR"` you might want to split the string with a little something like this:

```javascript
bru.setVar("token", res.body.split(" ")[1]);
```
