# syntax=docker/dockerfile:1.6
FROM php:8.3-fpm-bookworm AS build
RUN apt-get update && apt-get install -y --no-install-recommends zlib1g-dev libgrpc-dev && rm -rf /var/lib/apt/lists/*
COPY composer.json composer.lock* ./
RUN curl -sS https://getcomposer.org/installer | php && php composer.phar install --no-dev

FROM php:8.3-fpm-slim-bookworm AS runtime
WORKDIR /app
COPY --from=build /app/vendor ./vendor
COPY server.php .
ENV GRPC_PORT=50051 HTTP_PORT=8080
EXPOSE 50051 8080
CMD ["php", "server.php"]
