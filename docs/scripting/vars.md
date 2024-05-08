# Vars

Vars allow you to set variables before request, and after your receive the response.

In the *Pre Request Variables* section, you can write any Strings, Numbers or any valid JavaScript literal.

In the *Post Response Variables* section, you can write any valid JavaScript expression. The `res` object is available, allowing you to declaratively parse the [response](./response/response-object) and set variables, instead of writing scripts to do the same.

For parsing the response, you can checkout the [response query](./response/response-query) that allows you to easily query your response.

**Example:**
![bru vars](../public/images/vars.png)

![Screenshot showing how to use defined variables in the request body](../public/images/set_vars.png)
