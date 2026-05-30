# syntax=docker/dockerfile:1.6
FROM elixir:1.16-otp-26-slim AS build
WORKDIR /app
COPY mix.exs mix.lock* ./
RUN mix local.hex --force && mix local.rebar --force
RUN mix deps.get
COPY lib ./lib
ENV MIX_ENV=prod
RUN mix release

FROM debian:bookworm-slim AS runtime
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl libncurses6 && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/_build/prod/rel/ws_elixir .
ENV PORT=8080
EXPOSE 8080
CMD ["bin/ws_elixir", "start"]
