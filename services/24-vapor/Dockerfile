# ─────────────────────────────────────────────────────────────────────────
# Framework: 24 Swift Server — Vapor 4.121
# Pattern:   Multi-stage Docker
# Build:     ubuntu:24.04 (Swift 6.0.3)
# Runtime:   swift:6.0-noble-slim
# FIPS:      N/A — no dedicated FIPS variant for Swift Server
# Port:      8080
# Vapor: swift build -c release; REPLACE App with your target name
# ─────────────────────────────────────────────────────────────────────────

# ── Build stage ───────────────────────────────────────────────────────────
FROM swift:6.0.3 AS build
WORKDIR /app
COPY Package.swift ./
RUN swift package resolve
COPY Sources ./Sources
COPY Tests ./Tests
RUN swift build -c release
# REPLACE: 'App' in COPY below with your Swift target/product name

# ── Runtime stage (standard) ──────────────────────────────────────────────
FROM swift:6.0-noble-slim AS runtime
WORKDIR /app
RUN useradd -u 1001 -r app
COPY --from=build --chown=1001:0 /app/.build/release/App /app/app
# REPLACE: App with your executable target name
USER app
EXPOSE 8080
# REPLACE: /app/app with your Swift target binary name
ENTRYPOINT ["/app/app", "--hostname", "0.0.0.0", "--port", "8080"]

# ── Alternative runtime images ─────────────────────────────────────────────
# Uncomment ONE block below instead of the standard runtime above.
# Delete the standard block and all unused alternatives to keep it clean.

# Option: swift:6.0-jammy — Ubuntu Jammy, larger but maximum library compat
#FROM swift:6.0-jammy AS runtime
#WORKDIR /app
#RUN useradd -u 1001 -r app
#COPY --from=build --chown=1001:0 /app/.build/release/App /app/app
#USER app
#EXPOSE 8080
#ENTRYPOINT ["/app/app", "--hostname", "0.0.0.0", "--port", "8080"]

# Option: swift:6.0-alpine — smallest Swift runtime image (~80MB smaller than noble-slim)
#FROM swift:6.0-alpine AS runtime
#WORKDIR /app
#RUN adduser -D -u 1001 app
#COPY --from=build --chown=app:app /app/.build/release/App /app/app
#USER app
#EXPOSE 8080
#ENTRYPOINT ["/app/app", "--hostname", "0.0.0.0", "--port", "8080"]
