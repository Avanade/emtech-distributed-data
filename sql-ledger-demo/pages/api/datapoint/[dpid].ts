import { readQrCode, deleteQrCode } from '@/lib/sqlledger'

export default function datapointHandler({ query, method }, res) {
    let qid = query.qid;
    switch (method) {
        case 'GET':
            readQrCode(qid).then(result => res.status(200).json(result.recordsets));
            break
        case 'DELETE':
            deleteQrCode(qid).then(result => res.status(200).json(result.recordsets));
            break
        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}