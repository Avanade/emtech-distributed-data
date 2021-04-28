-- QR code (join not correct?)
SELECT
  [dbo].[Oltiva_QR].QRlocID AS QRLocId,
  [dbo].[Oltiva_Partners].PartnerName AS PartnerName
FROM
  [dbo].[Oltiva_QR]
  INNER JOIN [dbo].[Oltiva_QR] ON [dbo].[Oltiva_Partners].PartnerId (
    WHERE
      QRLocId = * INPUTId *
  );
-- insert Heart Rate
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