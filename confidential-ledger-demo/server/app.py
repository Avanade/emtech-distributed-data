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
import json

import confidentialledger as cl

templates = Jinja2Templates(directory="templates")

config = Config(".env")
DEBUG = config("DEBUG", cast=bool, default=False)


async def homepage(request):
    """Renders the default homepage."""
    await request.send_push_promise("/static/custom.min.css")
    await request.send_push_promise("/favicon.ico")
    return templates.TemplateResponse("index.html", {"request": request})


async def about(request):
    """Renders the About page."""
    return templates.TemplateResponse("about.html", {"request": request})


async def read(request):
    guid = request.path_params["guid"]
    # get data
    try:
        latest_data = cl.search_entries_guid(guid)
    except:
        errorMessage = "The confidential data connection isn't working"
        return JSONResponse({"Error": errorMessage})

    return_json = {}
    return_json.update({"read": guid})
    return_json.update({"data": json.loads(latest_data)})

    return JSONResponse(return_json)


async def readlicense(request):
    license_plate = request.path_params["license"]
    # get data
    try:
        latest_data = cl.search_entries_license(license_plate)
    except:
        errorMessage = "The confidential data connection seems not to be working"
        return JSONResponse({"Error": errorMessage})

    return JSONResponse({"read": license_plate, "data": latest_data})


async def append(request):

    newEntryId = str(uuid.uuid4())

    bodyData = await request.body()

    # verify json
    try:
        json.loads(bodyData)
    except:
        return JSONResponse({"error": "Body is not a valid json"})

    try:
        guid, returnData = cl.append_cl(bodyData)
    except:
        returnData = "The confidential data connection seems not to be working"

    return JSONResponse(
        {"Car ID": guid, "Ledger ID": str(returnData), "Data": json.loads(bodyData)}
    )


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
    Route("/append", append, methods=["GET", "POST"]),
    Route("/read/{guid}", read, methods=["GET"]),
    Route("/readlicense/{license}", readlicense, methods=["GET"]),
    Mount("/static", app=StaticFiles(directory="static"), name="static",),
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
