# syntax = docker/dockerfile:1

# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand:
# docker build -t my-app .
# docker run -d -p 80:80 -p 443:443 --name my-app -e RAILS_MASTER_KEY=<value from config/master.key> my-app

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=3.2.2
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Rails app lives here
WORKDIR /rails

# Install base packages and Node.js
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips postgresql-client libpq-dev \
    # Adiciona repositório do Node.js
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    # Instala Node.js e outros pacotes necessários
    && apt-get install -y nodejs build-essential git pkg-config \
    # Instala Yarn
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set development environment
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_APP_CONFIG="/usr/local/bundle" \
    PATH="/rails/bin:${PATH}"

# Install correct bundler version
RUN gem install bundler

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Create package.json if it doesn't exist and install Node.js dependencies
COPY package.json* ./
RUN if [ ! -f package.json ]; then echo '{"private": true}' > package.json; fi
RUN yarn install

# Copy application code
COPY . .

# Make sure scripts are executable
RUN chmod +x bin/*

# Add a script to be executed every time the container starts
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000 3036
CMD ["foreman", "start", "-f", "Procfile.dev"]
