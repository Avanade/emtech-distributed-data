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
  QRType varchar(255),
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
  (3002, 'Greater London Health Service'),
  (3003, 'Wandsworth Heath Surgery'),
  (3004, 'Jamesons Sports Equipment'),
  (3005, 'Diabetes Research UK'),
  (3006, 'Le Lapment Laboratories')
INSERT INTO
  [dbo].[Oltiva_Users] (UserId, UserName, JoinDate, LastActiveDate)
VALUES
  (
    1001,
    'Leah Wallis',
    '2021-04-17T10:41:34',
    '2021-04-17T10:41:34'
  ),
  (
    1002,
    'James Wallis',
    '2021-04-18T11:44:34',
    '2021-04-17T09:32:34'
  ),
  (
    1003,
    'Daniel Sing',
    '2021-02-11T17:54:14',
    '2021-04-17T09:33:35'
  ),
  (
    1004,
    'Sarah Green',
    '2021-01-21T13:11:54',
    '2021-04-16T17:31:33'
  )