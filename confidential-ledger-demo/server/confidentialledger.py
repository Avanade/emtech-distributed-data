# Import the Azure authentication library
# Copyright (c) 2021 Avanade Inc.
# Copyright (c) 2021 Microsoft.

import os
import json
from dotenv import load_dotenv

from azure.identity import DefaultAzureCredential

# import the data plane sdk
from azure.confidentialledger import ConfidentialLedgerClient
from azure.confidentialledger.identity_service import (
    ConfidentialLedgerIdentityServiceClient,
)


def get_ledger_creds():

    load_dotenv()
    TENANT_ID = os.getenv("AZURE_TENANT_ID")
    os.environ["AZURE_TENANT_ID"] = TENANT_ID
    credential = DefaultAzureCredential()

    resource_group = os.getenv("RESOURCE_GROUP")
    ledger_name = os.getenv("RESOURCE_NAME")
    subscription_id = os.getenv("AZURE_TENANT_ID")

    identity_url = "https://identity.accledger.azure.com"
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


def read_all():
    ledger_client = get_ledger_client()
    all = []
    for entry in ledger_client.get_ledger_entries():
        all.append([entry.contents, entry.transaction_id])

    return all


def search_entries_guid(search_guid):
    """Returns a list of entries with the relavant guid"""
    returns = []

    ledger_client = get_ledger_client()
    entries = ledger_client.get_ledger_entries()

    for entry in entries:
        try:
            json_read = json.loads(str(entry.contents))
            if (json_read["Meta"]["guid"]) == search_guid:
                returns.append(entry.contents)

        except:
            # not a valid json
            pass

    return returns
