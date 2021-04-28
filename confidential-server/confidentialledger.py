from typing import Dict, NamedTuple
import argparse

from dotenv import load_dotenv
import os


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
