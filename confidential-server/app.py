""" Server allows people to record themselves on the fly,
and sync with their teams, wherever they may be."""
# Copyright (c) 2021 Chris Lloyd-Jones.
# Copyright (c) 2021 Avanade Inc.

import uuid
import os
import asyncio
from starlette.applications import Starlette
from starlette.responses import (
    Response,
    FileResponse,
    JSONResponse,
    RedirectResponse,
)
from starlette.staticfiles import StaticFiles
from starlette.routing import Route, Mount
from starlette.templating import Jinja2Templates
from starlette.middleware import Middleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.config import Config
import aiofiles
import uvicorn
from datetime import datetime, timedelta
from urllib.parse import quote
import date_funcs
from dotenv import load_dotenv

templates = Jinja2Templates(directory="templates")

config = Config(".env")
DEBUG = config("DEBUG", cast=bool, default=False)


def getLedgerUri():

    load_dotenv()  # take environment variables from .env.

    return (os.getenv("IDENTITY_SERVICE_URI"), os.getenv("LEDGER_URI"))


async def homepage(request):
    """Renders the default homepage."""
    await request.send_push_promise("/static/custom.min.css")
    await request.send_push_promise("/favicon.ico")
    return templates.TemplateResponse("index.html", {"request": request})


async def about(request):
    """Renders the About page."""
    return templates.TemplateResponse("about.html", {"request": request})


async def read(request):
    name = request.path_params["carid"]
    # get data

    return JSONResponse({"read": name})


async def append(request):
    return JSONResponse({"append": "no input"})


async def error_template(request, exc):
    """Returns an error template and a message specific to the error case."""
    error_messages = {
        404: "Sorry, the page you're looking for isn't here.",
        500: "Server error.",
    }
    print(f"Code: {error_messages}")
    if exc.status_code in error_messages:
        error_message = error_messages[exc.status_code]
    else:
        error_message = "No message saved for this error."
    return templates.TemplateResponse(
        "layout/error.html",
        {
            "request": request,
            "error_code": exc.status_code,
            "error_message": error_message,
        },
    )


routes = [
    Route("/", homepage),
    Route("/about", about),
    Route("/favicon.ico", FileResponse("static/favicon.ico")),
    Route("/append", append),
    Route("/read/{carid}", read, methods=["GET"]),
    Mount(
        "/static",
        app=StaticFiles(directory="static"),
        name="static",
    ),
]

middleware = [
    Middleware(GZipMiddleware, minimum_size=500),
    Middleware(
        uvicorn.middleware.proxy_headers.ProxyHeadersMiddleware, trusted_hosts="*"
    ),
]

exception_handlers = {404: error_template, 500: error_template}

app = Starlette(
    debug=DEBUG,
    routes=routes,
    middleware=middleware,
    exception_handlers=exception_handlers,
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", log_level="info")
