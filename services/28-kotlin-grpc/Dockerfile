# syntax=docker/dockerfile:1.6
FROM gradle:8.7-jdk21 AS build
WORKDIR /app
COPY build.gradle.kts settings.gradle.kts* ./
RUN gradle dependencies --no-daemon 2>/dev/null || true
COPY src ./src
RUN gradle installDist --no-daemon

FROM eclipse-temurin:21-jre-bookworm AS runtime
WORKDIR /app
COPY --from=build /app/build/install/28-kotlin-grpc .
ENV GRPC_PORT=50051
EXPOSE 50051
CMD ["bin/28-kotlin-grpc"]
