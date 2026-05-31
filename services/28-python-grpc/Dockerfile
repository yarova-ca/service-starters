# syntax=docker/dockerfile:1.6
FROM python:3.12-slim-bookworm AS build
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN printf 'root:x:0:0:root:/root:/bin/sh\nnobody:x:65534:65534:nobody:/nonexistent:/bin/false\napp:x:1001:1001::/home/app:/sbin/nologin\n' > /tmp/app-passwd \
 && printf 'root:x:0:\nnobody:x:65534:\napp:x:1001:\n' > /tmp/app-group

FROM python:3.12-slim AS base-slim
FROM python:3.12-alpine AS base-alpine
FROM registry.access.redhat.com/ubi9/python-39 AS base-fips

ARG RUNTIME=slim
FROM base-${RUNTIME} AS runtime
WORKDIR /app
COPY --from=build /tmp/app-passwd /etc/passwd
COPY --from=build /tmp/app-group /etc/group
COPY --from=build --chown=1001:1001 /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=build --chown=1001:1001 /usr/local/bin /usr/local/bin
COPY --chown=1001:1001 src/ ./src/
COPY --chown=1001:1001 proto/ ./proto/
ENV GRPC_PORT=50051 HTTP_PORT=8080
USER 1001
EXPOSE 50051 8080
CMD ["python", "src/server.py"]

FROM base-fips AS runtime-fips
WORKDIR /app
COPY --from=build /tmp/app-passwd /etc/passwd
COPY --from=build /tmp/app-group /etc/group
COPY --from=build --chown=1001:1001 /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=build --chown=1001:1001 /usr/local/bin /usr/local/bin
COPY --chown=1001:1001 src/ ./src/
COPY --chown=1001:1001 proto/ ./proto/
ENV GRPC_PORT=50051 HTTP_PORT=8080
USER 1001
EXPOSE 50051 8080
CMD ["python", "src/server.py"]
