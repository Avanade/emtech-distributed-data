import os
import sqlalchemy as sa
from sqlalchemy import create_engine, insert
from urllib.parse import quote_plus
from dotenv import load_dotenv
import urllib


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


def sqlInsert(user_table):
    stmt = insert(user_table).values(name="username", fullname="Full Username")


engine = sqlEngine()
