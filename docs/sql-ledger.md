# SQL Ledger

Found in the `sql-ledger-demo` directory, a web application designed to show healthcare scenarios for SQL Ledger.

For more information about SQL Ledger, see [sql-ledger-usecase](docs/sql-ledger-usecase.md)

## Pre-requisites

- An Azure SQL service with ledger table capabilities turned on
- A hosting location
  1. Local with node.js or docker
  2. Azure hosting with node.js or docker container

# Setting up the application

## SQL setup

Once an Azure SQL with ledger tables enabled has been setup, use the [Setup.sql](sql/Setup.sql) to create the necesary tables within the database according to the data model below.

## SQL Procedures

For common procedures relavant to the use case, see [procedures.sql](sql/procedures.sql)

## .env file

Fill in the [.env file](https://github.com/Avanade/emtech-distributed-data/blob/main/sql-ledger-demo/.env.template) with the required details for your server.

You can either rename this `.env.local` for local running, or in the [App Settings](https://docs.microsoft.com/en-gb/azure/app-service/configure-common#configure-app-settings) for your application in Azure.

# Use Case

For more information on the chosen use case see [sql-ledger-usecase](docs/sql-ledger-usecase.md)

# Technical Architecture

### Run the backend server

`cd ledger-server`
`./dev-server-start.sh`

### API

Endpoints:

### Data Model:

![](./sql-ledger-images/data-model.png)

## User Journey

![](./sql-ledger-images/user-journey.png)

## Sitemap

![](./sql-ledger-images/sitemap.png)

## Technical Architecture

![](./diagrams-as-code/sql_ledger_technical_architecture.png)
