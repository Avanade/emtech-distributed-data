import os
import sqlalchemy as sa
from sqlalchemy import create_engine
from urllib.parse import quote_plus
from dotenv import load_dotenv
import urllib

import random
from datetime import datetime
import time


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

    stmt = sa.insert(TABLE).values(
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

    engine = sqlEngine()
    conn = engine.connect()
    metadata = sa.MetaData()
    metadata.reflect(bind=engine)

    HR_table = metadata.tables["Oltiva_DataPoint"]

    i_DataSetId = 5001
    i_DataPointId = 0

    while True:
        i_DataPointId += 1

        HRSim = random.randint(60, 180)

        # datetime object containing current date and time
        now = datetime.now()
        # dd/mm/YY H:M:S
        i_DataTimeStamp = now.strftime("%Y-%m-%d %H:%M:%S")

        ins = (
            metadata.tables["Oltiva_DataPoint"]
            .insert()
            .values(
                DataSetId=i_DataSetId,
                DataPointId=i_DataPointId,
                DataTimestamp=i_DataTimeStamp,
                DataValue=str(HRSim),
            )
        )
        try:
            conn.execute(ins)
        except:
            print("wait")
        time.sleep(4)


# engine = sqlEngine()


# getQR(engine, 4001)
# sqlInsert(engine, "Oltiva_Partners")

SimulateHeart()
