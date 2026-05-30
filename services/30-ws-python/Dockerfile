# syntax=docker/dockerfile:1.6
FROM python:3.12-slim-bookworm AS build
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim-bookworm AS runtime
WORKDIR /app
COPY --from=build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=build /usr/local/bin /usr/local/bin
COPY src/ ./src/
ENV PORT=8080
EXPOSE 8080
CMD ["python", "src/main.py"]
