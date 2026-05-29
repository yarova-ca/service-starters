# ─────────────────────────────────────────────────────────────────────────
# Framework: 25 Scala — Play 3.0
# Pattern:   Multi-stage Docker
# Build:     ubuntu:24.04 (sbt + OpenJDK 21)
# Runtime:   gcr.io/distroless/java21-debian12 (distroless)
# FIPS:      registry.access.redhat.com/ubi9/openjdk-21-runtime
# Port:      9000
# Play: sbt dist; unzip dist/universal/*.zip; run bin/<app-name>
# ─────────────────────────────────────────────────────────────────────────

# ── Build stage ───────────────────────────────────────────────────────────
FROM ubuntu:24.04 AS build
RUN apt-get update && apt-get install -y --no-install-recommends openjdk-21-jdk curl \
 && curl -fL https://github.com/sbt/sbt/releases/download/v1.10.5/sbt-1.10.5.tgz | tar -xz -C /usr/local \
 && rm -rf /var/lib/apt/lists/*
ENV PATH="/usr/local/sbt/bin:$PATH" 
WORKDIR /app
COPY build.sbt ./
COPY project ./project
RUN sbt update
COPY app ./app
COPY conf ./conf
RUN sbt stage

# ── Runtime stage (standard — distroless) ─────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
RUN adduser -D -u 1001 app
COPY --from=build /app/target/universal/stage/ ./
RUN chmod +x bin/25-play
USER app
EXPOSE 9000
ENV JAVA_OPTS="-Dhttp.port=9000 -Dplay.http.secret.key=changeme"
CMD ["bin/25-play"]

# ── Alternative runtime images ─────────────────────────────────────────────
# Uncomment ONE block below instead of the standard runtime above.
# Delete the standard block and all unused alternatives to keep it clean.

# Option: eclipse-temurin:21-jre-alpine — smaller Alpine JRE, shell available for debugging
#FROM eclipse-temurin:21-jre-alpine AS runtime
#WORKDIR /app
#RUN adduser -D -u 1001 app
#COPY --from=build /app/target/scala-*/*-assembly-*.jar app.jar
#USER 1001
#EXPOSE 9000
#ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Option: amazoncorretto:21-al2023-jdk — Amazon Corretto on Amazon Linux 2023
#FROM amazoncorretto:21-al2023-jdk AS runtime
#WORKDIR /app
#RUN useradd -u 1001 -r app
#COPY --from=build /app/target/scala-*/*-assembly-*.jar app.jar
#USER 1001
#EXPOSE 9000
#ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# ── Runtime — FIPS (OpenJDK 21 on UBI9) ──────────────────────────────────
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime AS runtime-fips
WORKDIR /deployments
COPY --from=build /app/target/universal/stage/ /deployments/
RUN chmod +x /deployments/bin/25-play
USER 1001
EXPOSE 9000
ENV JAVA_OPTS="-Dhttp.port=9000 -Dplay.http.secret.key=changeme"
CMD ["/deployments/bin/25-play"]
