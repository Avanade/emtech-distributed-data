# Confidential Ledger

## Setup - Python SDK

In public preview the Python SDK can be used to set up the confidential ledger. Ensure the correct variables have been entered into the .env file from the [.env.template](confidential-server/.env.template) example.

If you are new to confidential ledger, use the instructions in the [Microsoft documentation](https://docs.microsoft.com/en-gb/azure/confidential-ledger/quickstart-python?tabs=azure-cli) to enable your subscription and register for the service using:

`az login` to login to your Azure subscription

` az provider register --namespace "microsoft.ConfidentialLedger"` to register a confidential ledger resource. At the time of writing, there is no option to deploy confidential ledger as part of the Azure Portal UI.

Run the [Confidential Ledger setup script](confidential-server/confidential-setup.py) to put a new ledger into your created resource.

You can now insert new entries into the ledger and retrieve them using the SDK.

`N.B Using the provided script will create and upload a cert for you, so you will not need to create your own cert`

## Setup - REST

In private preview, confidential ledger is set up through REST calls. These are available in the [Confidential ledger setup requests file](confidential-server/confidential-setup.http).

Set up your .env file to contain at least:

```
BEARER_TOKEN=""
RESOURCE_GROUP=""
RESOURCE_NAME=""
CERT=""
STORAGE_NAME=""
```

TODO: explain bearer token

Resource group is the name of your target RG

Resource name is what you wish to call your ledger, or the name of the existing ledger

`N.B. The Ledger Resource name cannot contain an underscore '_' character despite being included in teh field descriptor`

CERT is the contents of your user_cert.pem

`N.B. This may no longer be necesary, checking with MSoft`

And storage name is the name of an Azure storage account in the same RG.

## First time

If doing inital setup, run the PUT request `PUT a new ledger resource on the subscription`

## Once Created

Once created, use the other requests provided to explore the ledger
