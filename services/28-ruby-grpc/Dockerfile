# syntax=docker/dockerfile:1.6
FROM ruby:3.3-bookworm AS build
WORKDIR /app
COPY Gemfile Gemfile.lock* ./
RUN bundle install

FROM ruby:3.3-slim-bookworm AS runtime
WORKDIR /app
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY . .
ENV GRPC_PORT=50051
EXPOSE 50051
CMD ["ruby", "server.rb"]
