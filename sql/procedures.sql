-- QR code (join not correct?)
select
  A.*
from
  [dbo].[Oltiva_Partners] A
  inner join [dbo].[Oltiva_QR] B on A.PartnerId = B.PartnerId
where
  B.QRlocId = * Search ID * -- insert Heart Rate
INSERT INTO
  [dbo].[Oltiva_DataPoints] (DataPointId, DataSetId, DataTimestamp, DataValue)
VALUES
  (
    * NewUniwuieId *,
    * DatasetId *,
    * Timenow *,
    * BPMmeasure *
  ) -- Revoke Access
DELETE FROM
  [dbo].[Oltiva_QR]
WHERE
  PartnerId = * INPUTId *;
-- Get HR Data
Select
  *
FROM
  [dbo].[Oltiva_DataPoints]
WHERE
  DataSetId = * INPUTId * -- Get user DataSets
select
  A.*,
  B.[Unit],
  B.[DataType],
  B.[SharedUntilDateTime],
  B.[DataStatus]
from
  [dbo].[Oltiva_Partners] A
  inner join [dbo].[Oltiva_DataSet] B on A.PartnerId = B.PartnerId
WHERE
  * user id * -- Read user ledger
select
  A.*,
  B.[Unit],
  B.[DataType],
  B.[LastUpdateDateTime],
  B.[SharedUntilDateTime],
  B.[ledger_sequence_number],
  B.[DataStatus],
  B.[ledger_operation_type_desc]
from
  [dbo].[Oltiva_Partners] A
  inner join [dbo].[Oltiva_DataSet_Ledger] B on A.PartnerId = B.PartnerId
WHERE
  B.UserId = @param_user_id
ORDER BY
  B.[ledger_sequence_number];
--Delete outdated datasets
DELETE FROM
  [dbo].[Oltiva_DataSet]
WHERE
  SharedUntilDateTime < GETDATE();