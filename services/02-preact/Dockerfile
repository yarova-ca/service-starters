# syntax=docker/dockerfile:1.6
# ── build ────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── runtime (standard — default) ─────────────────────────────────────────────
FROM nginx:1.27-bookworm-slim AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ── runtime variants ──────────────────────────────────────────────────────────
# slim / chainguard / ubi9 / edge variants follow same pattern:
# replace nginx:1.27-bookworm-slim with preferred base, keep COPY + CMD.
