# Bruno CLI

With Bruno CLI, you can run your API collections with ease using simple command line commands.

This makes it easier to test your APIs in different environments, automate your testing process, and integrate your API tests with your continuous integration and deployment workflows.

## Installation
To install the Bruno CLI, use the node package manager of your choice, such as NPM:
```bash
npm install -g @usebruno/cli
```

## Getting started
Navigate to the directory where your API collection resides, and then run:
```bash
bru run
```
This command will run all the requests in your collection. You can also run a single request by specifying its filename:

```bash
bru run request.bru
```

Or run all requests in a folder:
```bash
bru run folder
```

If you need to use an environment, you can specify it with the --env option:
```bash
bru run folder --env Local
```

Pass Environment variables to your collection using the --env-var option:
```bash
bru run folder --env Local --env-var JWT_TOKEN=1234
```

If you need to collect the results of your API tests, you can specify the --output option:
```bash
bru run folder --output results.json
```

## Options
| Option | Details |
|----------|-------------|
| -h, --help |  	Show help|
| --version | Show version number|
| -r | Indicates a recursive run (default: false)|
| --cacert [string] | CA certificate to verify peer against|
| --env [string] | Environment variables|
| --env-var [string] | Overwrite a single environment variable, multiple usages possible|
| -o, --output [string] | Path to write file results to|
| -f, --format [string] | Format of the file results; available formats are "json" (default) or "junit"|
| --insecure | Allow insecure server connections|

## Demo
![bru cli](../public/images/cli-demo.png)

## Support
If you encounter any issues or have any feedback or suggestions, please raise them on our [GitHub repository](https://github.com/usebruno/bruno)