FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip install -r /requirements.txt

# Set work directory.
RUN mkdir /code
WORKDIR /code

# Copy project code.
COPY . /code/

# Entrypoint
COPY ./environments/django-entrypoint.sh /django-entrypoint.sh
RUN chmod +x /django-entrypoint.sh
ENTRYPOINT ["./django-entrypoint.sh"]
