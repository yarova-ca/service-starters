# syntax=docker/dockerfile:1.6
FROM ruby:3.3-bookworm AS build
WORKDIR /app
COPY Gemfile Gemfile.lock* ./
RUN bundle install

FROM ruby:3.3-slim-bookworm AS runtime
WORKDIR /app
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY . .
ENV PORT=9292 RACK_ENV=production
EXPOSE 9292
CMD ["bundle", "exec", "puma", "-b", "tcp://0.0.0.0:9292"]
