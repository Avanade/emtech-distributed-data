import { readLedger, appendLedger } from "@/lib/cl-api";

export default async function dataHandler({ query, method }, res) {
    let uuid = query.uuid;
    switch (method) {
        case 'GET':
            readLedger(uuid).then(result => res.status(200).json(result));
            break;
        case 'POST':
            appendLedger(uuid, req.body).then(result => res.status(200).json(result));
            break
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}