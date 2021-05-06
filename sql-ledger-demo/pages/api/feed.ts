import { readUserLedger } from '@/lib/sqlledger';
import { NextApiRequest, NextApiResponse } from 'next'

let userId = 1001;

let operations = {
  "INSERT": "Shared"
}

function addOperationType(dataSetObject) {
  dataSetObject.content = "Unknown activity";
  if (dataSetObject.hasOwnProperty('ledger_operation_type_desc')) {
    let operationType = dataSetObject.ledger_operation_type_desc;
    if (operationType in operations) {
      dataSetObject.content = operations[operationType];
    }
    return dataSetObject
  }
}

export default function mydataHandler({ method }, res) {
  switch (method) {
    case 'GET':
      readUserLedger(userId).then(result => res.status(200).json(result.recordsets[0].map(addOperationType)));
      break
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}