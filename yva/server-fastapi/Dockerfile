FROM python:slim

RUN apt-get update && apt-get install -y \
    libpq-dev \
    libjpeg-dev \
    libcairo2 \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

ENV PATH=/app/.venv/bin:$PATH
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN mkdir -p /app
RUN python -m venv /app/.venv

WORKDIR /app
COPY . .

RUN chmod +x /run.sh
CMD ["/run.sh"]
