# Bruno Docs 📝

The official [Bruno Documentation](https://docs.usebruno.com/) repository, built with [Mintlify](https://mintlify.com/).

## Contributing

> [!NOTE]
> Node.js **LTS version (v20 or v22 recommended)**. Node v25+ is not supported by Mintlify. 

1. Clone the repository.
```shell
git clone https://github.com/usebruno/bruno-docs.git
cd bruno-docs
```

2. Install Mintlify CLI globally (if not already installed)
```shell
npm install -g mint
```

3. Start development server
```shell
mint dev
```

This will start a local server, and you can view the site by visiting `http://localhost:3000` in your browser.

## Project Structure

- `docs.json` - Mintlify configuration file (navigation, versions, theme settings)
- `*.mdx` - Documentation pages written in MDX format
- `images/` - Screenshots and assets used in documentation
- `snippets/` - Custom React components used in documentation

## Documentation Format

- Documentation pages use `.mdx` format (Markdown with JSX)
- Custom components are available in the `snippets/` directory
- Images should be placed in `images/screenshots/` with appropriate subdirectories
- Use Mintlify components like `<Info>`, `<Warning>`, `<Tip>`, `<Tabs>`, etc.

Learn more about [Mintlify](https://mintlify.com/docs)