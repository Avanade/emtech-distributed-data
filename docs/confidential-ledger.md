# Confidential Ledger

## Overview
This section describes how to set up the [Confidential Ledger usecase](confidential-ledger-usecase.md).

The use case comprises a backend python server, and a frontend TypeScript server. Both components are deployed to Azure with Docker Compose.

### Backend Server
Found in the [confidential-ledger-demo/server](confidential-ledger-demo/server) directory, you will find a Python web application designed to show smart car interaction scenarios with confidential ledger

The server iniates a connection to the confidential ledger, and posts data passed to it, adding appropriate meta data. It can also retrieve and filter results read from the confidential ledger.

## Setting up the Demo

### 1. Confidential Ledger
Create and set up your confidential-ledger - read the [confidential ledger setup](docs/confidential-ledger-setup.md) document, to create and authenticate an Azure Application to use the Confidential Ledger SDK.
### 2. .env file

Fill in the [.env file](./confidential-server/server/.env.TEMPLATE) with the details in the template, to allow the application to store and read date to the confidential ledger.

### 3. Run the multi-container application locally

Open the `confidential-ledger-demo` directory and run `docker-compose up --build -d` to build the container images, and start the application.

Open [https://localhost:3000] to see the application in use.

### 4. Deploy the application in Azure

To deploy the multi-container application in Azure, [follow the instructions provided by the Microsoft Docs](https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose?WT.mc_id=AI-MVP-5004204#create-azure-context).

# Alternatives
You can also run the backend and frontend server separately to see the interactions.
## Run the backend server

`cd confidential-ledger-demo/server`
`./dev-server-start.sh`

## API

Once up and running, the confidential-ledger-demo server will contain the folwoing endpoints:

`/read/{uuid}` -
GET request to fetch the confidential ledger entry for a given uuid

`/readlicense/{license}` -
GET request to fetch all confidential ledger entry for a given license plate

`/append` -
POST request to upload a Json artifact to confidential ledger. The JSON object is sent on the body of the request as applciation/json.

Json artifacts should adhere to to format provided in the [sample data JSON](docs/sampledata.json).

`NOTE: The Meta Data is automatically added by the code provided, and does not need to be added when submitting an append request`

The method will return the guid of the entry, as well as the confidetnail ledger id of the entry. At present only the guid is used for data retrieval.

## Uisng the REST API.

In [confidential usage](confidential-ledger-demo/server/confidential-usage.http) you will see a selection of REST calls to make various calls to the confidential ledger service.

To autherise these you will need to get a Bearer token by running the following Azure CLI command:

`az account get-access-token --subscription "{subscription name or id}"`

Which you can thne insert into your .env file as:

`BEARER_TOKEN="{your token}"`

To use these requests instlal and then follow the visual studio code [instructions](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for the Http requests module.
