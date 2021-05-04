CREATE TABLE [Oltiva_users](
  UserId int NOT NULL primary key,
  UserName varchar(255),
  JoinDate DATETIME,
  LastActiveDate DATETIME
) WITH (SYSTEM_VERSIONING = ON, LEDGER = ON);
CREATE TABLE [Oltiva_Partners](
  PartnerId int NOT NULL,
  PartnerName varchar(255),
  PRIMARY KEY (PartnerId),
) WITH (SYSTEM_VERSIONING = ON, LEDGER = ON);
CREATE TABLE [Oltiva_QR](
  QRlocId int NOT NULL,
  PartnerId int NOT NULL,
  QRType int,
  Duration DATETIME,
  PRIMARY KEY (QRlocID),
  FOREIGN KEY (PartnerId) REFERENCES Oltiva_Partners(PartnerId)
) WITH (SYSTEM_VERSIONING = ON, LEDGER = ON);
CREATE TABLE [Oltiva_DataSet](
  DataSetId int NOT NULL,
  UserId int NOT NULL,
  PartnerId int NOT NULL,
  Unit varchar(255),
  LastUpdateDateTime DATETIME,
  DataType varchar(255),
  SharedUntilDateTime DATETIME,
  DataStatus varchar(255),
  PRIMARY KEY (DataSetId),
  FOREIGN KEY (PartnerId) REFERENCES Oltiva_Partners(PartnerId),
  FOREIGN KEY (UserId) REFERENCES Oltiva_users(UserId)
) WITH (SYSTEM_VERSIONING = ON, LEDGER = ON);
CREATE TABLE [Oltiva_DataPoint](
  DataPointId int NOT NULL,
  DataSetId int NOT NULL,
  DataTimestamp DATETIME,
  DataValue varchar(255),
  PRIMARY KEY (DataPointId),
  FOREIGN KEY (DataSetId) REFERENCES Oltiva_DataSet(DataSetId)
) WITH (SYSTEM_VERSIONING = ON, LEDGER = ON);
INSERT INTO
  [dbo].[Oltiva_QR]
VALUES
  (4002, 3004, 'Equipment', '2021-07-13T09:00:00')
INSERT INTO
  [dbo].[Oltiva_Partner] (PartnerId, PartnerName)
VALUES
  (3001, 'Sacred Heart Health Ltd'),
  (3002, 'Greater London Health Service')