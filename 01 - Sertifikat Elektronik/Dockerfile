FROM tiangolo/uvicorn-gunicorn:python3.8

# WeasyPrint Dependencies
RUN apt-get update && \
    apt-get install -y build-essential libcairo2 libpango-1.0-0 \
        libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

RUN pip install fastapi uvicorn weasyprint jinja2 

COPY . /app

