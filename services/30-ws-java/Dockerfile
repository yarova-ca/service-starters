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
ENV PORT=8080
EXPOSE 8080 8081
CMD ["java", "-jar", "app.jar"]
