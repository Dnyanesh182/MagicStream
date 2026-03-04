#!/bin/bash
# ==============================================
# MagicStream Production Database Seed Script
# ==============================================
# Prerequisites: mongoimport (MongoDB Database Tools)
# Install: https://www.mongodb.com/docs/database-tools/installation/
#
# Usage:
#   export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net"
#   export DATABASE_NAME="magicstream"
#   bash scripts/seed-mongo.sh
# ==============================================

set -euo pipefail

if [ -z "${MONGODB_URI:-}" ] || [ -z "${DATABASE_NAME:-}" ]; then
    echo "ERROR: MONGODB_URI and DATABASE_NAME must be set"
    exit 1
fi

SEED_DIR="$(dirname "$0")/../magic-stream-seed-data"

echo "=== Seeding MagicStream Database ==="
echo "Database: $DATABASE_NAME"

for collection in genres rankings movies users; do
    FILE="$SEED_DIR/${collection}.json"
    if [ -f "$FILE" ]; then
        echo "→ Importing $collection..."
        mongoimport --uri "$MONGODB_URI" \
            --db "$DATABASE_NAME" \
            --collection "$collection" \
            --jsonArray \
            --file "$FILE" \
            --drop
        echo "  ✓ $collection imported"
    else
        echo "  ✗ $FILE not found, skipping"
    fi
done

echo "=== Seed Complete ==="
