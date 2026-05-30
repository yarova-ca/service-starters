# syntax=docker/dockerfile:1.6
FROM golang:1.22-bookworm AS build
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM debian:bookworm-slim AS runtime
WORKDIR /app
COPY --from=build /app/server .
ENV PORT=8080
EXPOSE 8080
CMD ["./server"]

# slim
# FROM gcr.io/distroless/base-debian12 AS runtime
# COPY --from=build /app/server /server
# EXPOSE 8080
# CMD ["/server"]
