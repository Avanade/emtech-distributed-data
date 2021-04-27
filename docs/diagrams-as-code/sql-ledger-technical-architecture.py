from diagrams import Cluster, Diagram, Edge
from diagrams.azure.web import AppServices, AppServicePlans
from diagrams.azure.database import SQLServers, SQLDatabases

with Diagram("SQL Ledger Technical Architecture", show=False):
    with Cluster("Azure"):
        with Cluster("Compute"):
            app_service_plan = AppServicePlans("App Service Plan")
            web_app = AppServices("Web App")
            app_service_plan - web_app
        with Cluster("Data"):
            with Cluster("SQL Ledger Enabled Database"):
                sql_server = SQLServers("SQL Server")
                sql_database = SQLDatabases("SQL Database")
                sql_server - sql_database
        web_app >> sql_database
