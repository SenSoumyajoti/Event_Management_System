FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

EXPOSE 8000

# For development; using 0.0.0.0 so container is reachable from other containers/host
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
