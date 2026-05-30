# syntax=docker/dockerfile:1.6
FROM eclipse-temurin:21-jdk-bookworm AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B 2>/dev/null || true
COPY src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:21-jre-bookworm AS runtime
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV GRPC_PORT=50051 HTTP_PORT=8080
EXPOSE 50051 8080
CMD ["java", "-jar", "app.jar"]

# slim
# FROM gcr.io/distroless/java21-debian12 AS runtime
# COPY --from=build /app/target/*.jar /app.jar
# EXPOSE 50051 8080
# CMD ["/app.jar"]
