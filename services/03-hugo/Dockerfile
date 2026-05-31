# ─────────────────────────────────────────────────────────────────────────
# Framework: 03 SSG — Hugo 0.161
# Pattern:   Multi-stage Docker (build → static → nginx)
# Build:     ubuntu:24.04
# Runtime:   nginx:alpine (default) | nginx:1.27-stable-alpine3.21-slim | ubi9/nginx-122
# Port:      80
# Hugo: hugo --minify outputs to public/
# RUNTIME build-arg: alpine (default) | stable | fips
# ─────────────────────────────────────────────────────────────────────────

# ── Build stage ───────────────────────────────────────────────────────────
FROM ubuntu:24.04 AS build
RUN apt-get update && apt-get install -y --no-install-recommends wget ca-certificates \
 && wget -q https://github.com/gohugoio/hugo/releases/download/v0.161.0/hugo_extended_0.161.0_linux-amd64.tar.gz \
 && tar -xzf hugo_extended_0.161.0_linux-amd64.tar.gz -C /usr/local/bin \
 && rm hugo_extended_0.161.0_linux-amd64.tar.gz \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN hugo --minify

# ── Base image stages (no RUN — selection only) ───────────────────────────
FROM nginx:alpine AS base-alpine
FROM nginx:1.27-stable-alpine3.21-slim AS base-stable
FROM registry.access.redhat.com/ubi9/nginx-122 AS base-fips

# ── Runtime stage (ARG-selectable) ────────────────────────────────────────
ARG RUNTIME=alpine
FROM base-${RUNTIME} AS runtime
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ── Runtime — FIPS ────────────────────────────────────────────────────────
FROM base-fips AS runtime-fips
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
