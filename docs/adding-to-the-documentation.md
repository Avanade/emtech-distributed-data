# Adding to the documentation
## Requirements
### Diagrams
Run the following commands to install `graphviz`, and set up an environment to be able to generate documentation images.

`brew install graphviz`
`conda create --name distribdata python=3.9 -y`
`pip install diagrams`

### Mermaid
Install the [Mermaid Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=tomoyukim.vscode-mermaid-editor).

Generate images as .mmd files are updated, and commit them.

## Image Generation
Diagrams are generated with [Python Diagrams](https://pypi.org/project/diagrams/) and using the [Mermaid Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=tomoyukim.vscode-mermaid-editor), which supports most [mermaid formatting](https://github.com/mermaid-js/mermaid/blob/master/README.md), in the .mmd format.