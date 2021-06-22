# Documentation Overview

This repository is intended to hold Avanade's exploration with Azure SQL Database Ledger Tables

## Related

- **[How to contribute](https://github.com/Avanade/emtech-distributed-data/tree/main/CONTRIBUTING.md)**
- **[Our code of conduct](https://github.com/Avanade/emtech-distributed-data/tree/main/CODE_OF_CONDUCT.md)**
- [SQL Ledger Tables Demo](./sql-ledger.md)

## Folder Structure

- docs - documentation, process flows and state diagrams, and technical architecture.
- sql-ledger-demo - the Azure web app for the Azure SQL database ledger tables demo.
- sql-ledger-demo/python-tools - tools for updating and generating random data in SQL ledger.
- sql-ledger-demo/sql - Examples of the SQL we used to set up our SQL ledger demo.
- confidential-ledger-demo/ - the Docker compose definition to run the confidential ledger use case.
- confidential-ledger-demo/client - the Azure web app for the confidential ledger demo.
- confidential-ledger-demo/server - the backend python server for the webapp.
- .vscode - configuration and recommendations for the VS Code IDE.
# Running the demos

## Main Demos

Both demos use a frontend built with [Next.js](https://nextjs.org/), which then integrates with the respective distributed data solution. More information [is available for the SQL Ledger Tables demo](./sql-ledger.md) and [for the Confidential Ledger demo](./confidential-ledger.md).

You can run the demos locally using [nodejs](https://nodejs.org/en/download/), or a [dockerfile](https://docs.docker.com/get-started/#what-is-a-container)/docker compose definition is provided for each demo, enabling you to run locally or deploy to Azure with all dependencies included.

Whatever your decision, both demos have a `.env.template` file in their respective directories, which shows application settings that you will need. These need to either be contained in a local `.env.local` file, or in the [App Settings](https://docs.microsoft.com/en-gb/azure/app-service/configure-common?WT.mc_id=AI-MVP-5004204#configure-app-settings) for your application in Azure.

### Running the next.js server locally with node

1. Open the `.env.template` file, and update with your settings - save it as `.env.local`
2. Run `npm install` to ensure you have all dependencies.
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Python Tooling

The tooling uses Python, and we recommend using a conda environment when installing requirements, for example:

```bash
$ conda create --name distribdata python=3.9 -y
$ conda activate distribdata
$ pip install -r requirements-dev.txt
```

### Software Installation for Python Tooling

1. Create a separate Python environment for your installation, and activate it. You have two options:

   a. _Use a Conda distribution_

   If you are using a distribution of conda, you may want to create a new conda environment, rather than use venv:

   `conda create --name distribdata python=3.9 -y`

   b. _Use a Python virtual environment_

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

### Running the SQL code directly

You can use the [SQL Server](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql) extension for VS Code to run the SQL ledger examples directly. On non-windows machines, make sure you have drivers for MS SQL installed.

On a mac, you can run the following commands:

```
brew install unixodbc
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
brew install msodbcsql mssql-tools
```
