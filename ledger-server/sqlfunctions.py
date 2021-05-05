import os
import sqlalchemy as sa
from sqlalchemy import create_engine
from urllib.parse import quote_plus
from dotenv import load_dotenv
import urllib

import random
from datetime import datetime
import time

# TODO: Decide whether to remove simulator into dedicated app


def sqlEngine():

    load_dotenv()  # take environment variables from .env.

    server = os.getenv("SERVER_NAME")
    database = os.getenv("DB_NAME")
    username = os.getenv("USERNAME")
    password = os.getenv("PASSWORD")
    port = os.getenv("PORT")

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

    engine = create_engine(connect_str)
    return engine


def sqlInsert(engine, table_name):

    META_DATA = sa.MetaData(bind=engine, reflect=True)

    TABLE = META_DATA.tables[table_name]

    stmt = sa.insert(TABLE).values(
        [{"PartnerId": 3009}, {"PartnerName": "Wandsworth Health Service"}]
    )


def getQR(code):

    engine = sqlEngine()
    conn = engine.connect()
    metadata = sa.MetaData()
    metadata.reflect(bind=engine)

    # Get Table
    ex_table = metadata.tables["Oltiva_QR"]

    query = ex_table.select()
    query = query.where(ex_table.c.QRlocId == code)
    result = conn.execute(query)

    found = ""

    for row in result:
        if row.QRlocId == code:
            found = row.PartnerId

    partner_table = metadata.tables["Oltiva_Partners"]

    query = partner_table.select()
    result = conn.execute(query)

    for prow in result:
        if prow.PartnerId == found:
            print("partner is ", prow.PartnerName)

            return prow.PartnerName
    return "No matching QR ID"


def SimulateHeartRand():

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


def SimulateHeartList(HR_list):

    engine = sqlEngine()
    conn = engine.connect()
    metadata = sa.MetaData()
    metadata.reflect(bind=engine)

    HR_table = metadata.tables["Oltiva_DataPoint"]

    i_DataSetId = 5001
    i_DataPointId = 0
    j = 0

    while True:
        i_DataPointId += 1

        HRSim = HR_list[j]

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
        j += 1
        time.sleep(4)


def getAll(table_name):

    engine = sqlEngine()
    conn = engine.connect()
    metadata = sa.MetaData()
    metadata.reflect(bind=engine)

    table = metadata.tables[table_name]

    s = table.select()
    rs = conn.execute(s)

    return rs


def dropTable(table_name):
    engine = sqlEngine()
    conn = engine.connect()
    metadata = sa.MetaData()
    metadata.reflect(bind=engine)

    table = metadata.tables[table_name]

    table.drop(engine)


def revokeAccess(PartnerId):
    engine = sqlEngine()
    conn = engine.connect()
    metadata = sa.MetaData()
    metadata.reflect(bind=engine)

    table = metadata.tables["Oltiva_DataSet"]

    query = sa.delete(table)
    query = query.where(table.columns.PartnerId == PartnerId)
    results = conn.execute(query)


getQR(4001)
