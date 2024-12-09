FROM python:3

WORKDIR /app
COPY ["/e2ee-internal", "."]
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

CMD ["python", "main.py"]
