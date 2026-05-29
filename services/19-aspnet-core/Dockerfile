# ─────────────────────────────────────────────────────────────────────────
# Framework: 19 .NET — ASP.NET Core 9
# Pattern:   Multi-stage Docker
# Build:     ubuntu:24.04 (.NET SDK 9.0)
# Runtime:   mcr.microsoft.com/dotnet/aspnet:9.0-alpine
# FIPS:      mcr.microsoft.com/dotnet/aspnet:9.0-cbl-mariner2.0-fips
# Port:      8080
# ASP.NET Core: dotnet publish -c Release -o out; REPLACE App.dll with your assembly name
# ─────────────────────────────────────────────────────────────────────────

# ── Build stage ───────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app
COPY App/*.csproj App/
RUN dotnet restore App/
COPY . .
RUN dotnet publish App/ -c Release -o /app/out --self-contained false

# ── Runtime stage (standard) ──────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS runtime
WORKDIR /app
RUN adduser -u 1001 -D appuser
COPY --from=build --chown=appuser:appuser /app/out ./
USER appuser
EXPOSE 8080
# REPLACE: App.dll with your assembly name (project name without extension)
ENTRYPOINT ["dotnet", "19-aspnet-core.dll"]

# ── Alternative runtime images ─────────────────────────────────────────────
# Uncomment ONE block below instead of the standard runtime above.
# Delete the standard block and all unused alternatives to keep it clean.

# Option: mcr.microsoft.com/dotnet/aspnet:9.0-noble — Ubuntu Noble, glibc (better Linux compat)
#FROM mcr.microsoft.com/dotnet/aspnet:9.0-noble AS runtime
#WORKDIR /app
#RUN adduser -u 1001 -D appuser
#COPY --from=build --chown=appuser:appuser /app/out ./
#USER appuser
#EXPOSE 8080
#ENTRYPOINT ["dotnet", "19-aspnet-core.dll"]

# Option: mcr.microsoft.com/dotnet/aspnet:9.0 — Debian bookworm slim (default Microsoft base)
#FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
#WORKDIR /app
#RUN adduser -u 1001 -D appuser
#COPY --from=build --chown=appuser:appuser /app/out ./
#USER appuser
#EXPOSE 8080
#ENTRYPOINT ["dotnet", "19-aspnet-core.dll"]

# ── Runtime — FIPS (Mariner 2.0 FIPS-compliant .NET) ─────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:9.0-cbl-mariner2.0-fips AS runtime-fips
WORKDIR /app
RUN adduser -u 1001 -D appuser
COPY --from=build --chown=appuser:appuser /app/out ./
USER appuser
EXPOSE 8080
# REPLACE: App.dll with your assembly name
ENTRYPOINT ["dotnet", "19-aspnet-core.dll"]
