# syntax=docker/dockerfile:1.6
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/proto ./proto
COPY --from=build /app/node_modules ./node_modules
ENV GRPC_PORT=50051 HTTP_PORT=8080 NODE_ENV=production
EXPOSE 50051 8080
CMD ["node", "dist/index.js"]

# slim
# FROM gcr.io/distroless/nodejs22-debian12 AS runtime
# WORKDIR /app
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/proto ./proto
# COPY --from=build /app/node_modules ./node_modules
# ENV GRPC_PORT=50051 HTTP_PORT=8080 NODE_ENV=production
# EXPOSE 50051 8080
# CMD ["dist/index.js"]
