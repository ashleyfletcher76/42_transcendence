FROM python:3.13-slim

# install postgresql dev libraries
RUN apt-get update && apt-get install -y libpq-dev gcc openssl curl && \
	apt-get clean && rm -rf /var/lib/apt/lists/*

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set working directory
WORKDIR /app

# copy requirments and install deps
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# copy the rest
COPY . /app/

# add entrypoing and copy script
COPY entrypoint.sh .
RUN chmod +x /app/entrypoint.sh

# expose the port
EXPOSE 8000

# use an entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

# run dev server
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:8000"]
