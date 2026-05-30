# syntax=docker/dockerfile:1.6
# ── build ────────────────────────────────────────────────────────────────────
FROM oven/bun:1.1-debian AS build
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun build src/index.ts --outfile dist/index.js --target bun

# ── runtime (standard — default) ─────────────────────────────────────────────
FROM oven/bun:1.1-distroless AS runtime
WORKDIR /app
COPY --from=build /app/dist/index.js .
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "run", "index.js"]

# ── runtime variants ──────────────────────────────────────────────────────────
# standard (with shell)
# FROM oven/bun:1.1-debian AS runtime
# WORKDIR /app
# COPY --from=build /app/dist/index.js .
# ENV PORT=3000
# EXPOSE 3000
# CMD ["bun", "run", "index.js"]

# ubi9
# FROM registry.access.redhat.com/ubi9-minimal AS runtime
# RUN microdnf install -y unzip && microdnf clean all
# RUN curl -fsSL https://bun.sh/install | bash
# WORKDIR /app
# COPY --from=build /app/dist/index.js .
# ENV PORT=3000
# EXPOSE 3000
# CMD ["/root/.bun/bin/bun", "run", "index.js"]

# edge (multi-arch)
# FROM --platform=$TARGETPLATFORM oven/bun:1.1-debian AS runtime
# WORKDIR /app
# COPY --from=build /app/dist/index.js .
# ENV PORT=3000
# EXPOSE 3000
# CMD ["bun", "run", "index.js"]
