# Secrets Management

## Problem Statement

In any collection, there are secrets that need to be managed. These secrets can be anything such as API keys, passwords, or tokens.

A common practice is to store these secrets in environment variables.

There are two ways in which developers share bruno collections:
* Check in the collection folder to source control (like git)
* Export the collection to a file and share it

In both these cases we want to ensure that the secrets are stripped out of the collection before it is shared.

## Solution

Bruno offers two approaches to manage secrets in collections.

- [DotEnv File](/secrets-management/dotenv-file)
- [Secret Variables](/secrets-management/secret-variables)
