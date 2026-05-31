# syntax=docker/dockerfile:1.6
FROM golang:1.22-bookworm AS build
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .
RUN printf 'root:x:0:0:root:/root:/bin/sh\nnobody:x:65534:65534:nobody:/nonexistent:/bin/false\napp:x:1001:1001::/home/app:/sbin/nologin\n' > /tmp/app-passwd \
 && printf 'root:x:0:\nnobody:x:65534:\napp:x:1001:\n' > /tmp/app-group

FROM debian:bookworm-slim AS base-slim
FROM gcr.io/distroless/base-debian12 AS base-distroless
FROM registry.access.redhat.com/ubi9-minimal AS base-fips

ARG RUNTIME=slim
FROM base-${RUNTIME} AS runtime
WORKDIR /app
COPY --from=build /tmp/app-passwd /etc/passwd
COPY --from=build /tmp/app-group /etc/group
COPY --from=build /app/server .
ENV GRPC_PORT=50051 HTTP_PORT=8080
USER 1001
EXPOSE 50051 8080
CMD ["/app/server"]

FROM base-fips AS runtime-fips
WORKDIR /app
COPY --from=build /tmp/app-passwd /etc/passwd
COPY --from=build /tmp/app-group /etc/group
COPY --from=build /app/server .
ENV GRPC_PORT=50051 HTTP_PORT=8080
USER 1001
EXPOSE 50051 8080
CMD ["/app/server"]
