FROM python:3.9-alpine as base
FROM base as builder

RUN apk -U upgrade
RUN apk update && apk add python3-dev\
                        gcc\
                        libc-dev\
                        build-base\
                        libffi-dev\
                        libressl-dev\
                        cargo

RUN mkdir /install
WORKDIR /install
COPY requirements.txt /requirements.txt
RUN pip install --prefix=/install -r /requirements.txt --no-warn-script-location

FROM base
COPY --from=builder /install /usr/local
COPY . /app
WORKDIR /app

EXPOSE 5000
ENTRYPOINT [ "python3","app.py"]
