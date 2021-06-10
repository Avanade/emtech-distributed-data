FROM python:3.9-alpine as base
FROM base as builder

RUN apk update && apk add python3-dev \
                        gcc \
                        libc-dev\
                        build-base

RUN mkdir /install
WORKDIR /install
COPY requirements.txt /requirements.txt
RUN pip install --prefix=/install -r /requirements.txt --no-warn-script-location

FROM base
COPY --from=builder /install /usr/local
COPY . /app
WORKDIR /app

CMD [ "uvicorn", "app:app","--port","3000"]
EXPOSE 3000