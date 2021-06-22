## Use the python SDK to setup a confidential ledger

First import the required libraries:

For more information on these libraries and how to install them, see the [confidential ledger documentation](https://docs.microsoft.com/en-us/azure/confidential-ledger/quickstart-python?tabs=azure-cli&WT.mc_id=AI-MVP-5004204)

```
from dotenv import load_dotenv
import os

from azure.identity import ClientSecretCredential
from azure.mgmt.confidentialledger import ConfidentialLedger as ConfidentialLedgerAPI
from azure.mgmt.confidentialledger.models import ConfidentialLedger
from azure.confidentialledger import ConfidentialLedgerClient
from azure.confidentialledger.identity_service import (
    ConfidentialLedgerIdentityServiceClient,
)
```

If using a .env file you can run:

```
load_dotenv()

# Set tenant ID from .env file
client_id = os.getenv("CL_APP_ID")
client_secret = os.getenv("CL_CLIENT_SC")
tenant_id = os.getenv("AZURE_TENANT_ID")
```

Or, set the required information manually in your environment. For more infomration on setting up and application id and client secret, see [the setup doc](docs/confidential-ledger-setup-python.md) under 'Setup - Register an Application'.

Next, set the credentials to connect to the confidential ledger

```
# Create a Credential Object
credential = ClientSecretCredential(
    tenant_id=tenant_id, client_id=client_id, client_secret=client_secret
)

resource_group = os.getenv("RESOURCE_GROUP")
ledger_name = os.getenv("RESOURCE_NAME")
subscription_id = os.getenv("SUBSCRIPTION_ID")

identity_url = "https://identity.confidential-ledger.core.azure.com"
ledger_url = "https://" + ledger_name + ".confidential-ledger.azure.com"
```

Next, create the connection and set the properties:

```
confidential_ledger_mgmt = ConfidentialLedgerAPI(credential, subscription_id)

properties = {
    "location": "eastus",
    "tags": {},
    "properties": {
        "ledgerType": "Public",
        "aadBasedSecurityPrincipals": [],
    },
}

ledger_properties = ConfidentialLedger(**properties)

```

Finally, create the ledger using:

```
confidential_ledger_mgmt.ledger.begin_create(
    resource_group, ledger_name, ledger_properties
)
```

`N.B. At the time of writing this process appears to take some time to provision although the call comes back as succesful. You may need to wait a few minutes before you are able to use the ledger.`

Check the details of your new ledger using:

```
myledger = ledger = confidential_ledger_mgmt.ledger.get(resource_group, ledger_name)

print("Here are the details of your newly created ledger:")
print(f"- Name: {myledger.name}")
print(f"- Location: {myledger.location}")
print(f"- ID: {myledger.id}")
```

## Full code sample:

```
# Copyright (c) 2021 Avanade Inc.
# Copyright (c) 2021 Microsoft.

from dotenv import load_dotenv
import os

from azure.identity import ClientSecretCredential
from azure.mgmt.confidentialledger import ConfidentialLedger as ConfidentialLedgerAPI
from azure.mgmt.confidentialledger.models import ConfidentialLedger
from azure.confidentialledger import ConfidentialLedgerClient
from azure.confidentialledger.identity_service import (
    ConfidentialLedgerIdentityServiceClient,
)

load_dotenv()

# Set tenant ID from .env file
client_id = os.getenv("CL_APP_ID")
client_secret = os.getenv("CL_CLIENT_SC")
tenant_id = os.getenv("AZURE_TENANT_ID")

# Create a Credential Object
credential = ClientSecretCredential(
    tenant_id=tenant_id, client_id=client_id, client_secret=client_secret
)

resource_group = os.getenv("RESOURCE_GROUP")
ledger_name = os.getenv("RESOURCE_NAME")
subscription_id = os.getenv("SUBSCRIPTION_ID")

identity_url = "https://identity.confidential-ledger.core.azure.com"
ledger_url = "https://" + ledger_name + ".confidential-ledger.azure.com"

confidential_ledger_mgmt = ConfidentialLedgerAPI(credential, subscription_id)

properties = {
    "location": "eastus",
    "tags": {},
    "properties": {
        "ledgerType": "Public",
        "aadBasedSecurityPrincipals": [],
    },
}

ledger_properties = ConfidentialLedger(**properties)

confidential_ledger_mgmt.ledger.begin_create(
    resource_group, ledger_name, ledger_properties
)

confidential_ledger_mgmt.ledger.begin_create(
    resource_group, ledger_name, ledger_properties
)
myledger = ledger = confidential_ledger_mgmt.ledger.get(resource_group, ledger_name)

print("Here are the details of your newly created ledger:")
print(f"- Name: {myledger.name}")
print(f"- Location: {myledger.location}")
print(f"- ID: {myledger.id}")

# N.B Ledger creation seems to take some time

```
