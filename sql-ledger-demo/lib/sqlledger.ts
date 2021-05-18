const sql = require('mssql')

const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER_NAME,
    port: Number(process.env.DB_PORT),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true,
        debug: { data: true, payload: true } // Note: This is a prototype app, but debug should not be on in production
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const userId = (getRandomInt(15)+1000)

sql.on('error', err => {
    console.error(`${err.name}: ${err.message}`);
})

export async function getUser() {
    return 	userId
    
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

export async function readUserDataSets(UserId: number) {
    try {
        let pool = await sql.connect(sqlConfig)
        return await pool.request()
            .input('param_user_id', sql.Int, UserId)
            .query('select A.*, B.[Unit], B.[DataType], B.[LastUpdateDateTime], B.[SharedUntilDateTime], B.[DataStatus] from [dbo].[Oltiva_Partners] A inner join [dbo].[Oltiva_DataSet] B on A.PartnerId = B.PartnerId WHERE B.UserId = @param_user_id; ')
    } catch (err) {
        console.error(`Error in readUserDataSets with userid ${UserId}`);
    }
}

export async function readUserLedger(UserId: number) {
    try {
        let pool = await sql.connect(sqlConfig)
        return await pool.request()
            .input('param_user_id', sql.Int, UserId)
            .query('select A.*, B.[Unit], B.[DataType], B.[LastUpdateDateTime], B.[SharedUntilDateTime], B.[ledger_sequence_number], B.[DataStatus], B.[ledger_operation_type_desc] from [dbo].[Oltiva_Partners] A inner join [dbo].[Oltiva_DataSet_Ledger] B on A.PartnerId = B.PartnerId WHERE B.UserId = @param_user_id ORDER BY B.[ledger_sequence_number];')
    } catch (err) {
        console.error(`Error in readUserDataSets with userid ${UserId}`);
    }
}
