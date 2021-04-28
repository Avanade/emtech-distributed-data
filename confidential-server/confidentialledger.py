# Copyright (c) 2021 Microsoft.
# Copyright (c) 2021 Avanade Inc.


from enum import Enum

from typing import Dict, NamedTuple, Iterable
import argparse

from dotenv import load_dotenv
import os
import json

from dataclasses_serialization.json import JSONSerializer


class Certificates(NamedTuple):
    """Collection of certificate filenames."""

    network_cert_filename: str
    public_key_filename: str
    private_key_filename: str


class AppData(NamedTuple):
    """Collection of data required by the client."""

    certificates: Certificates
    receipts: Dict
    identity_url: str
    ledger_url: str


class Response:
    """Base class for response objects."""

    @staticmethod
    # Microsoft TOxDO: this should be moved to a common dir as shared between different projects
    def _validate_required_fields(json_response: Dict, required_fields: Iterable[str]):
        for field in required_fields:
            if field not in json_response:
                raise ValueError(f"JSON response missing required field {field}")


class GetLedgerDataResponse(Response):
    """Translate the state response retrieved from a CCF node."""

    view: str
    seqno: str

    @staticmethod
    def from_json_response(json_response: Dict):
        """Produce a LedgerResponse from a JSON response."""
        print(json_response)
        GetLedgerDataResponse._validate_required_fields(json_response, ["commit_info"])

        return GetLedgerDataResponse(
            str(json_response["commit_info"]["view"]),
            str(json_response["commit_info"]["seq-no"]),
        )

    # Serialize
    def to_json(self):
        return JSONSerializer.serialize(self)


class GetLedgerDataResponseWithBody(GetLedgerDataResponse):
    """Translate the state response retrieved from a CCF node."""

    # response: LedgerResponse
    body: str

    @staticmethod
    def from_json_response(json_response: Dict):
        """Produce a LedgerResponse from a JSON response."""
        print(json_response)
        GetLedgerDataResponse._validate_required_fields(
            json_response, ["body", "commit_info"]
        )

        return GetLedgerDataResponseWithBody(
            view=str(json_response["commit_info"]["view"]),
            seqno=str(json_response["commit_info"]["seq-no"]),
            body=json_response["body"],
        )


class RequestType(Enum):
    """Enum for possible HTTP request types."""

    GET = 0
    POST = 1


def getLedgerUri():

    load_dotenv()  # take environment variables from .env.

    return (os.getenv("IDENTITY_SERVICE_URI"), os.getenv("LEDGER_URI"))


def createAppData():

    parser = argparse.ArgumentParser("Sends commands to a Confidential Ledger")

    parser.add_argument(
        "--public-key", help="user public key", default="user0_cert.pem"
    )

    parser.add_argument(
        "--private-key", help="user private key", default="user0_privk.pem"
    )

    parser.add_argument(
        "-v",
        "--verbose",
        help="enable verbose output",
        action="store_true",
        default=False,
    )

    args = parser.parse_args()

    identity_url, ledger_url = getLedgerUri()

    # Create AppDataObject
    app_data = AppData(
        Certificates("", args.public_key, args.private_key),
        {},
        identity_url,
        ledger_url,
    )

    return app_data


def rpc_get_latest():

    result = _make_request__(
        createAppData(), "latest", data={"id": 1}  # this should (be?) commitId
    )
    # Format to ledger Response
    response = GetLedgerDataResponseWithBody.from_json_response(json.loads(result))
    return response


def rpc_put(body, wait_for_commit=False):
    commit_data = {}
    # Using the same LedgerId
    data = {"id": 1, "body": body}
    print(data)
    response = _make_request__(
        createAppData(), "latest", data=data, request_type=RequestType.POST
    )


def _make_request__(
    self,
    app_data: AppData,
    method: str,
    data: Dict = None,
    request_type: RequestType = RequestType.GET,
):
    """Makes a request to the network."""
    headers = (
        None
        if request_type == RequestType.GET
        else {"content-type": "application/json"}
    )
    url = f"https://{self._app_data.ledger_url}/app/{method}"
    if request_type == RequestType.GET:
        response = self._session.get(
            url,
            headers=headers,
            verify=self._network_cert_path,
            cert=(
                self._app_data.certificates.public_key_filename,
                self._app_data.certificates.private_key_filename,
            ),
            params=data,
        )
    elif request_type == RequestType.POST:
        response = self._session.post(
            url,
            headers=headers,
            verify=self._network_cert_path,
            cert=(
                self._app_data.certificates.public_key_filename,
                self._app_data.certificates.private_key_filename,
            ),
            json=data,
        )
    else:
        raise RuntimeError("Unsupported request type")

    expected_commit_info = {
        "x-ccf-tx-seqno": "seq-no",
        "x-ccf-global-commit": "global-commit",
        "x-ccf-tx-view": "view",
    }

    commit_info = {}
    for header_key, print_key in expected_commit_info.items():
        if header_key not in response.headers:
            continue

        commit_info[print_key] = response.headers[header_key]

    # Check for { because the put request says it's application/json type but is
    # just a bool.
    result_data = {}
    if response.text.find("{") != -1:
        result_data = json.loads(response.text)
    else:
        result_data["response"] = response.text

    result_data["commit_info"] = commit_info

    result_output = json.dumps(result_data, indent=4, sort_keys=True)

    return result_output
