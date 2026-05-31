# ─────────────────────────────────────────────────────────────────────────
# Framework: 02 CSR/SPA — React 19
# Pattern:   Multi-stage Docker (build → static → nginx)
# Build:     ubuntu:24.04
# Runtime:   nginx:alpine (default) | nginx:1.27-stable-alpine3.21-slim | ubi9/nginx-122
# Port:      80
# React: static assets in dist/ or build/ depending on bundler
# RUNTIME build-arg: alpine (default) | stable | fips
# ─────────────────────────────────────────────────────────────────────────

# ── Build stage ───────────────────────────────────────────────────────────
FROM ubuntu:24.04 AS build
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get install -y nodejs \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Base image stages (no RUN — selection only) ───────────────────────────
FROM nginx:alpine AS base-alpine
FROM nginx:1.27-stable-alpine3.21-slim AS base-stable
FROM registry.access.redhat.com/ubi9/nginx-122 AS base-fips

# ── Runtime stage (ARG-selectable) ────────────────────────────────────────
ARG RUNTIME=alpine
FROM base-${RUNTIME} AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ── Runtime — FIPS ────────────────────────────────────────────────────────
FROM base-fips AS runtime-fips
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
