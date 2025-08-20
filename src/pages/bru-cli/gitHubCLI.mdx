import { Callout } from "nextra/components";
import BrunoButton from '../../components/BrunoButton';

# GitHub Actions Integration

[GitHub Actions](https://docs.github.com/en/actions) is a powerful continuous integration and continuous delivery (CI/CD) platform that enables you to automate your software development workflows directly from your GitHub repository. It provides seamless integration with GitHub's ecosystem, making it an ideal choice for teams looking to automate their API testing workflows.

Bruno CLI integrates seamlessly with GitHub Actions to automate API testing workflows.

Explore our GitHub Actions collection to see practical examples and test GitHub Actions CI/CD integration:

<BrunoButton 
  collectionUrl="https://github.com/bruno-collections/github-actions"
  width={160}
  height={40}
/>


## Prerequisites
- [Git](https://git-scm.com/downloads) Installed.
- GitHub repository with Bruno collection.


## Automate API Testing with GitHub Actions

1. Ensure your Bruno collections are properly organized in your repository:

```
your-api-project/
├── .github/
│   └── workflows/
│       └── api-tests.yml
├── collections/
│   ├── authentication/
│   │   ├── login.bru
│   │   └── logout.bru
├── environments/
│   ├── development.bru
│   ├── ci.bru
│   └── production.bru
└── bruno.json
```

2. In your repository, create the following directory structure:

```bash
mkdir -p .github/workflows
```

3. Create a new file `.github/workflows/api-tests.yml` sample script:

```yaml
name: API Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
    
    - name: Install Bruno CLI
      run: npm install -g @usebruno/cli
    
    - name: Run API Tests
      run: bru run --env ci --reporter-html results.html
    
    - name: Upload Test Results
      uses: actions/upload-artifact@v4
      with:
        name: test-results
        path: results.html
```

4. **Commit and push** your workflow file:
```bash
git add .github/workflows/api-tests.yml
git commit -m "Add GitHub Actions workflow for API testing"
git push origin main
```

5. **Monitor the workflow**:
   - Go to your GitHub repository
   - Click on the "Actions" tab
   - You should see your workflow running

6. **View results**:
   - Once completed, download the test results from the artifacts section
   - Open `results.html` in your browser for detailed reports

## Learn More

For more advanced GitHub Actions features and configurations, visit the [GitHub Actions documentation](https://docs.github.com/en/actions).