import os
import sqlalchemy as sa
from sqlalchemy import create_engine, insert
from urllib.parse import quote_plus
from dotenv import load_dotenv
import urllib

import random
from datetime import datetime


def sqlEngine():

    load_dotenv()  # take environment variables from .env.

    server = os.getenv("SERVER_NAME")
    database = os.getenv("DB_NAME")
    username = os.getenv("USERNAME")
    password = os.getenv("PASSWORD")
    port = os.getenv("PORT")

    driver = "{ODBC Driver 13 for SQL Server}"
    # connect using parsed URL
    odbc_str = (
        "DRIVER="
        + driver
        + ";SERVER="
        + server
        + ";PORT="
        + port
        + ";DATABASE="
        + database
        + ";UID="
        + username
        + ";PWD="
        + password
    )

    driver = "{ODBC Driver 17 for SQL Server}"

    odbc_str = (
        "DRIVER="
        + driver
        + ";SERVER="
        + server
        + ";PORT=1433;UID="
        + username
        + ";DATABASE="
        + database
        + ";PWD="
        + password
    )
    connect_str = "mssql+pyodbc:///?odbc_connect=" + urllib.parse.quote_plus(odbc_str)

    print(connect_str)

    engine = create_engine(connect_str)

    print(engine.execute("SELECT TOP 100 * FROM [dbo].[Oltiva_Partners]").fetchall())

    return engine


def sqlInsert(engine, table_name):

    META_DATA = sa.MetaData(bind=engine, reflect=True)

    TABLE = META_DATA.tables[table_name]

    stmt = insert(TABLE).values(
        [{"PartnerId": 3009}, {"PartnerName": "Wandsworth Health Service"}]
    )


def getQR(engine, code):

    # Create MetaData instance
    metadata = sa.MetaData(bind=engine, reflect=True)
    print(metadata.tables)

    # Get Table
    ex_table = metadata.tables["Oltiva_QR"]

    s = ex_table.select()
    rs = s.execute()
    for row in rs:
        if row.QRlocId == code:
            found = row.PartnerId

    partner_table = metadata.tables["Oltiva_Partners"]
    ps = partner_table.select()
    prs = ps.execute()
    for prow in prs:
        if prow.PartnerId == found:
            print("partner is ", prow.PartnerName)

            return prow.PartnerName


def SimulateHeart():
    HRSim = random.randint(60, 180)

    metadata = sa.MetaData(bind=sqlEngine(), reflect=True)
    HR_table = metadata.tables["Oltiva_DataPoint"]

    DataSetId = 5001

    # datetime object containing current date and time
    now = datetime.now()
    # dd/mm/YY H:M:S
    DataTimeStamp = now.strftime("%d/%m/%Y %H:%M:%S")

    toInsert = insert(HR_table).values(
        DataSetId=DataSetId, DataTimeStamp=DataTimeStamp, DataValue=HRSim
    )

    toInsert.execute()


engine = sqlEngine()


getQR(engine, 4001)
# sqlInsert(engine, "Oltiva_Partners")

SimulateHeart()
