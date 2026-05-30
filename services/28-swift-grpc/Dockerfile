# syntax=docker/dockerfile:1.6
FROM swift:5.10-bookworm AS build
WORKDIR /app
COPY Package.swift Package.resolved* ./
RUN swift package resolve
COPY Sources ./Sources
RUN swift build -c release

FROM swift:5.10-slim-bookworm AS runtime
WORKDIR /app
COPY --from=build /app/.build/release/Server ./server
ENV GRPC_PORT=50051
EXPOSE 50051
CMD ["./server"]
