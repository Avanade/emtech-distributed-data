const sql = require('mssql')

const sqlConfig = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.SERVER_NAME,
    port: process.env.PORT,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
}

export async function readQrCode(partnerId: number) {
    try {
        let pool = await sql.connect(sqlConfig)
        return await pool.request()
            .input('param_partner_id', sql.Int, partnerId)
            .query('select A.* from [dbo].[Oltiva_Partners] A inner join [dbo].[Oltiva_QR] B on A.PartnerId = B.PartnerId where B.QRlocId = @param_partner_id')
    } catch (err) {
        console.error(`Error in readQrCode with partnerID ${partnerId}`);
    }
}

export async function deleteQrCode(partnerId: number) {
    try {
        let pool = await sql.connect(sqlConfig)
        return await pool.request()
            .input('param_partner_id', sql.Int, partnerId)
            .query('DELETE FROM [dbo].[Oltiva_QR] WHERE PartnerId = @param_partner_id')
    } catch (err) {
        console.error(`Error in deleteQrCode with partnerID ${partnerId}`);
    }
}

export async function createDataPoint(DataPointId: number, DataSetId: number, DataSetTimestamp: string, DataValue: string) {
    try {
        let pool = await sql.connect(sqlConfig)
        return await pool.request()
            .input('param_datapoint_id', sql.Int, DataPointId)
            .input('param_dataset_id', sql.Int, DataSetId)
            .input('param_dataset_timestamp', sql.string, DataSetTimestamp)
            .input('param_datavalue', sql.string, DataValue)
            .query('INSERT INTO [dbo].[Oltiva_DataPoints](DataPointId, DataSetId, DataTimestamp, DataValue) VALUES (@param_datapoint_id, @param_dataset_id, @param_dataset_timestamp, @param_datavalue);')
    } catch (err) {
        console.error(`Error in createDataPoint with datapointid ${DataPointId}`);
    }
}

export async function readDataSet(DataSetId: number) {
    try {
        let pool = await sql.connect(sqlConfig)
        return await pool.request()
            .input('param_dataset_id', sql.Int, DataSetId)
            .query('Select * FROM [dbo].[Oltiva_DataPoints] WHERE DataSetId =  @param_dataset_id;')
    } catch (err) {
        console.error(`Error in createDataPoint with datasetid ${DataSetId}`);
    }
}