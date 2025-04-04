#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails
rm -f /rails/tmp/pids/server.pid

# Ensure all gems are in path
bundle install

# Then exec the container's main process using bundle exec
exec bundle exec "$@" 