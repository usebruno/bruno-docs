# Posting files

This page shows some examples that might be required for more advanced use-cases, e.g. when you have to upload a file.

To enable file system access with bruno, you have to enable a setting within the collections `bruno.json` file:

```json
{
  "version": "1",
  "name": "my-collection",
  "type": "collection",
  "scripts": {
    "moduleWhitelist": [
      "form-data"
    ],
    "filesystemAccess": {
      "allow": true
    }
  }
}
```

In the above shown example `filesystemAccess` is enabled. There is also a module loaded called `form-data`. This is only required if you want to upload a file via a form-data body like the below example shows. Bruno allows you to create a custom java script (in the Pre Request section) to grep the desired file and then put it to the request body: 

```javascript
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const attachmentFilename = "some.pdf";
const attachmentPath = path.join(bru.cwd(), attachmentFilename);
const attachment = fs.readFileSync(attachmentPath);

const formData = new FormData();
formData.append('documentSet.documents[0].multipartFile', attachment, { filename: attachmentFilename }); 

req.setBody(formData);
```
