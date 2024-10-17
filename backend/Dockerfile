FROM python:3.13-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set the working directory
WORKDIR /app

# copy the requirements
COPY requirements.txt /app/

# iinstall dependencies
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install psycopg2-binary

# copy the rest of the Django project code
COPY . /app/

RUN chmod +x /app/manage.py

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
