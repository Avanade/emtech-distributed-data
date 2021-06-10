# Confidential Ledger Server

Found in the [confidential-ledger-demo/server](confidential-ledger-demo/server) directory, you will find a Python web application designed to show smart car interaction scenarios with confidential ledger

The server iniates a connection to the confidential ledger, and posts data passed to it, adding appropriate meta data. It can also retrieve and filter results read from teh confidential ledger.

## .env file

Fill in the [.env file](confidential-server/.env.TEMPLATE) with the required details. See [confidential-ledger-setup.md](docs/confidential-ledger-setup.md) for more infomration on authenticating the app to use the CL SDK.

## Run the backend server

`cd confidential-server`
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

In [confidential usage](confidential-ledger-demo/server/confidential-useage.http) you will see a selection of REST calls to make various calls to the confidential ledger service.

To autherise these you will need to get a Bearer token:

`az account get-access-token --subscription "{subscription name or id}"`

Which you can thne insert into your .env file as:

`BEARER_TOKEN="{your token}"`

To use these requests instlal and then follow the visual studio code [instructions](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for the Http requests module.
