# Import the Azure authentication library

from azure.identity import DefaultAzureCredential

## Import the control plane sdk

from azure.mgmt.confidentialledger import ConfidentialLedger as ConfidentialLedgerAPI
from azure.mgmt.confidentialledger.models import ConfidentialLedger

# import the data plane sdk

from azure.confidentialledger import ConfidentialLedgerClient
from azure.confidentialledger.identity_service import (
    ConfidentialLedgerIdentityServiceClient,
)

import os
from dotenv import load_dotenv


def get_ledger_creds():

    load_dotenv()
    TENANT_ID = os.getenv("AZURE_TENANT_ID")
    os.environ["AZURE_TENANT_ID"] = TENANT_ID
    credential = DefaultAzureCredential()

    resource_group = os.getenv("RESOURCE_GROUP")
    ledger_name = os.getenv("RESOURCE_NAME")
    subscription_id = os.getenv("AZURE_TENANT_ID")

    identity_url = "https://identity.confidential-ledger.core.azure.com"
    ledger_url = "https://" + ledger_name + ".confidential-ledger.azure.com"

    return credential, ledger_name, identity_url, ledger_url


def get_ledger_client():

    credential, ledger_name, identity_url, ledger_url = get_ledger_creds()

    identity_client = ConfidentialLedgerIdentityServiceClient(identity_url)
    network_identity = identity_client.get_ledger_identity(ledger_id=ledger_name)

    ledger_tls_cert_file_name = "networkcert.pem"
    with open(ledger_tls_cert_file_name, "w") as cert_file:
        cert_file.write(network_identity.ledger_tls_certificate)

    ledger_client = ConfidentialLedgerClient(
        endpoint=ledger_url,
        credential=credential,
        ledger_certificate_path=ledger_tls_cert_file_name,
    )

    return ledger_client


def append_cl(data):
    ledger_client = get_ledger_client()
    append_result = ledger_client.append_to_ledger(entry_contents=str(data))
    print(append_result.transaction_id)
    check = ledger_client.get_transaction_status(append_result.transaction_id)
    print(check.state)

    return append_result.transaction_id
