# SQL Ledger

Found in the `ledger-server` directory, a Python web application designed to show healthcare scenarios for SQL Ledger.

## Get started

`Pre-requisite`: An Azure SQL service with ledger capabilities turned on

### SQL setup

Once an Azure SQL with ledger enabled has been setup, use the [Setup.sql](ledger-server/Setup.sql) to create the necesary tables within the database accoriding to the data model:

### .env file

Fill in the [.env file](ledger-server/.env.TEMPLATE) with the required details. Don't forget to whitelist the IP you will connect in from

### Data Model:

![](./sql-ledger-images/data-model.png)


## User Journey

![](./sql-ledger-images/user-journey.png)

## Sitemap

![](./sql-ledger-images/sitemap.png)

## Technical Architecture
![](./diagrams-as-code/sql_ledger_technical_architecture.png)
