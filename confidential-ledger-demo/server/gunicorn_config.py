# Copyright (c) 2021 Chris Lloyd-Jones, https://www.sealjay.com/asgi-python-web-app-azure-gunicorn-python/
# Configuration for Gunicorn on Azure
# Azure Startup Command should be: gunicorn -c gunicorn_config.py app:app
# See: https://docs.gunicorn.org/en/stable/settings.html#config
workers = 4
worker_class = "uvicorn.workers.UvicornWorker"
