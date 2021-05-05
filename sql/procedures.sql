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
  DataSetId = * INPUTId *