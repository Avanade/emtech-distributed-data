# SQL Ledger

Found in the `confidential-server` directory, a Python web application designed to show smart car interaction scenarios with confidential ledger

TODO: Update with confidentail ledger setup when available

### .env file

Fill in the [.env file](confidential-server/.env.TEMPLATE) with the required details. Don't forget to whitelist the IP you will connect in from

### Run the backend server

`cd confidential-server`
`./dev-server-start.sh`

### API

Endpoints:

`/read/{uuid}`
GER request to fetch the most recent confidential ledger entry for a given uuid

`/append`
POST request to upload a Json artifact to confidential ledger
