import { readUserDataSets } from '@/lib/sqlledger'

import { getUser } from '@/lib/sqlledger'

let userId = getUser();

let styling = {
  "bpm": { "fullName": "Beats Per Minute", "bgColor": 'bg-pink-600' }
}

function addStyling(dataSetObject) {
  if (dataSetObject.hasOwnProperty('Unit')) {
    let unit = dataSetObject.Unit;
    if (unit in styling) {
      dataSetObject.bgColor = styling[unit].bgColor;
      dataSetObject.type = styling[unit].fullName;
    } else {
      dataSetObject.bgColor = "bg-yellow-300";
      dataSetObject.type = unit;
    }
  }
  return dataSetObject
}

export default async function mydataHandler({ method }, res) {
  switch (method) {
    case 'GET':
      readUserDataSets(await userId).then(result => res.status(200).json(result.recordsets[0].map(addStyling)));
      break
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}