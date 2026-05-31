# syntax=docker/dockerfile:1.6
FROM eclipse-temurin:21-jdk-bookworm AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B 2>/dev/null || true
COPY src ./src
RUN mvn package -DskipTests -B
RUN printf 'root:x:0:0:root:/root:/bin/sh\nnobody:x:65534:65534:nobody:/nonexistent:/bin/false\napp:x:1001:1001::/home/app:/sbin/nologin\n' > /tmp/app-passwd \
 && printf 'root:x:0:\nnobody:x:65534:\napp:x:1001:\n' > /tmp/app-group

FROM eclipse-temurin:21-jre-bookworm AS base-temurin
FROM gcr.io/distroless/java21-debian12 AS base-distroless
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime AS base-fips

ARG RUNTIME=temurin
FROM base-${RUNTIME} AS runtime
WORKDIR /app
COPY --from=build /tmp/app-passwd /etc/passwd
COPY --from=build /tmp/app-group /etc/group
COPY --from=build --chown=1001:1001 /app/target/*.jar app.jar
ENV GRPC_PORT=50051 HTTP_PORT=8080
USER 1001
EXPOSE 50051 8080
CMD ["java", "-jar", "app.jar"]

FROM base-fips AS runtime-fips
WORKDIR /app
COPY --from=build /tmp/app-passwd /etc/passwd
COPY --from=build /tmp/app-group /etc/group
COPY --from=build --chown=1001:1001 /app/target/*.jar app.jar
ENV GRPC_PORT=50051 HTTP_PORT=8080
USER 1001
EXPOSE 50051 8080
CMD ["java", "-jar", "app.jar"]
