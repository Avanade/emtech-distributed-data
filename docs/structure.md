# Folder Structure

- docs - documentation
- docs/mermaid - process flows and state diagrams, and the .mmd files used to generate them
- docs/diagrams-as-code - technical architecture images and the python code used to generate them
- .vscode - configuration and recommendations for the VS Code IDE
- ledger-server - the cloud app which runs in Azure to run the ledger demo.
- confidential-server - the cloud app which runs in Azure to run the confidential ledger demo.
- prototyping - the folder containing frontend templates.

# Python Requirements
It's recommended to use a conda environment when installing requirements, e.g. `conda create --name distribdata  python=3.9 -y`

- requirements.txt -  will install all requirements
- requirements-dev.txt - will install requirements for developer tooling

Each folder has its own requirements.txt file.