#!/bin/sh
set -eu

case "${1:-}" in
  api)
    cd /app/apps/api
    exec node dist/index.js
    ;;

  frontend)
    cd /app/apps/frontend
    exec node build
    ;;

  *)
    echo "Usage: docker run mentora {api|frontend}"
    exit 1
    ;;
esac
