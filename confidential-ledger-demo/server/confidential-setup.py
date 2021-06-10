# Copyright (c) 2021 Avanade Inc.
# Copyright (c) 2021 Microsoft.

# Import the Azure authentication library

from azure.identity import ClientSecretCredential

## Import the control plane sdk

from azure.mgmt.confidentialledger import ConfidentialLedger as ConfidentialLedgerAPI
from azure.mgmt.confidentialledger.models import ConfidentialLedger

# import the data plane sdk

from azure.confidentialledger import ConfidentialLedgerClient
from azure.confidentialledger.identity_service import ConfidentialLedgerIdentityServiceClient

import os
from dotenv import load_dotenv

load_dotenv()

#Set tenant ID from .env file

clientId = os.getenv("CL_APP_ID")
clientSecret = os.getenv("CL_CLIENT_SC")
tenantId = os.getenv("AZURE_TENANT_ID")

# Create a Credential Object
credential = ClientSecretCredential(
    tenant_id=tenantId, client_id=clientId, client_secret=clientSecret
)

resource_group = os.getenv('RESOURCE_GROUP')
ledger_name = os.getenv('RESOURCE_NAME')
subscription_id = os.getenv('SUBSCRIPTION_ID')

identity_url = "https://identity.confidential-ledger.core.azure.com"
ledger_url = "https://" + ledger_name + ".confidential-ledger.azure.com"

confidential_ledger_mgmt = ConfidentialLedgerAPI(
    credential, subscription_id
)

properties = {
    "location": "eastus",
    "tags": {},
    "properties": {
        "ledgerType": "Public",
        "aadBasedSecurityPrincipals": [],
    },
}

ledger_properties = ConfidentialLedger(**properties)

confidential_ledger_mgmt.ledger.begin_create(resource_group, ledger_name, ledger_properties)

confidential_ledger_mgmt.ledger.begin_create(resource_group, ledger_name, ledger_properties)
myledger = ledger = confidential_ledger_mgmt.ledger.get(resource_group, ledger_name)
​
print("Here are the details of your newly created ledger:")
print (f"- Name: {myledger.name}")
print (f"- Location: {myledger.location}")
print (f"- ID: {myledger.id}")

#N.B Ledger creation seems to take some time