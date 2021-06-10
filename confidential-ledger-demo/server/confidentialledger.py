# Import the Azure authentication library
# Copyright (c) 2021 Avanade Inc.
# Copyright (c) 2021 Microsoft.

import os
import json
from dotenv import load_dotenv
import uuid
from datetime import datetime

# import the data plane sdk
from azure.confidentialledger import ConfidentialLedgerClient
from azure.identity import ClientSecretCredential, DefaultAzureCredential
from azure.confidentialledger.identity_service import (
    ConfidentialLedgerIdentityServiceClient,
)


def get_ledger_creds():

    load_dotenv()

    clientId = os.getenv("CL_APP_ID")
    clientSecret = os.getenv("CL_CLIENT_SECRET")
    tenantId = os.getenv("AZURE_TENANT_ID")

    # Create a Credential Object
    credential = ClientSecretCredential(
        tenant_id=tenantId, client_id=clientId, client_secret=clientSecret
    )

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

    guid, data = append_meta_data(json.loads(data))

    ledger_client = get_ledger_client()
    append_result = ledger_client.append_to_ledger(
        entry_contents=str((json.dumps(data)))
    )

    return guid, append_result.transaction_id


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

    return returns[0]


def search_entries_license(search_license):
    """Returns a json of entries with the relavant licese"""
    returns = {}

    ledger_client = get_ledger_client()
    entries = ledger_client.get_ledger_entries()

    for entry in entries:
        try:
            json_read = json.loads(str(entry.contents))
            if (json_read["Licence"]) == search_license:
                returns.update(json_read)

        except:
            # not a valid json
            pass

    return returns


def append_meta_data(content):
    """appends new guid and timestamp to given json"""

    generated_guid = str(uuid.uuid4())
    timestamp = str(datetime.now())

    meta = {"Meta": {"TimeStamp": timestamp, "guid": generated_guid}}

    content.update(meta)

    return generated_guid, content
