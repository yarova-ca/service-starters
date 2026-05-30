# syntax=docker/dockerfile:1.6
FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
WORKDIR /app
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim AS runtime
WORKDIR /app
COPY --from=build /publish .
ENV GRPC_PORT=50051 HTTP_PORT=8080
EXPOSE 50051 8080
ENTRYPOINT ["dotnet", "28-dotnet-grpc.dll"]
