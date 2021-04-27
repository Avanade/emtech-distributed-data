# Documentation Overview
As in [the main readme](https://github.com/Avanade/emtech-distributed-data/tree/main/README.md), this repository is intended to hold Avanade's exploration with SQL Ledger, Confidential Ledger, and other blockchain services.

Because of that, you could install and setup every widget and configuration, but you are unlikely to need every single widget installed at once.

## Related Docs
- **[How to contribute](https://github.com/Avanade/emtech-distributed-data/tree/main/CONTRIBUTING.md)**
- **[Our code of conduct](https://github.com/Avanade/emtech-distributed-data/tree/main/CODE_OF_CONDUCT.md)**
- [Folder Structure and package requirements](structure.md)

# Overall Structure
- Ledger Server - *The Python App used to demonstrate SQL ledger.*
- Protoyping - *The next.js app used for frontend prototyping.*
- Confidential Server - *The 2D demonstrator for self-driving cars and Confidential Ledger.*
# Software Installation

1. Create a separate Python environment for your installation, and activate it. You have two options:

   a. *Use a Conda distribution*

      If you are using a distribution of conda, you may want to create a new conda environment, rather than use venv:

      `conda create --name distribdata python=3.9 -y`

   b. *Use a Python virtual environment*

      On Windows, you may need to use `python` command where there are references to the `python3` command.

      On linux, you may need to run `sudo apt-get install python3-venv` first.

   ```bash
   $ python3 -m venv env
   $ source env/bin/activate
   $ pip3 install -r requirements-dev.txt
   ```


2. Install the required dependencies in your new Python environment.

   ```bash
   $ pip3 install -r requirements-dev.txt
   ```
   The `requirements.txt` file can be used alone if you don't intend to develop further.
3. Create an Azure Blob storage resource and update a `.env` file from template if developing locally.
4. [Create an Azure App Service with a Python Linux plan](https://docs.microsoft.com/en-us/azure/developer/python/tutorial-deploy-app-service-on-linux-03), and deploy the `webapp` folder.
5. [Set the *Azure Startup Command* on your Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/configure-language-python#customize-startup-command) to `gunicorn -c gunicorn_config.py app:app`.
6. [Set the Azure App Service settings](https://docs.microsoft.com/en-us/azure/app-service/configure-common#configure-app-settings) for your blob storage, matching the names you used on your local `.env` file, or [use the extension in VS code](https://docs.microsoft.com/en-us/azure/developer/python/tutorial-deploy-app-service-on-linux-03#optional-upload-an-environment-variable-definitions-file).


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