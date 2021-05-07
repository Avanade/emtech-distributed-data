# Confidential Ledger

## Setup

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
