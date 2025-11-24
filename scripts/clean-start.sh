#!/bin/bash

echo "🧹 Cleaning up development environment..."

# Find PID using port 3000
PID=$(lsof -ti :3000)

if [ -n "$PID" ]; then
  echo "⚠️  Killing process on port 3000 (PID: $PID)..."
  kill -9 $PID
else
  echo "✅ Port 3000 is free."
fi

# Remove Next.js lock file
LOCK_FILE=".next/dev/lock"
if [ -f "$LOCK_FILE" ]; then
  echo "🗑️  Removing lock file: $LOCK_FILE"
  rm "$LOCK_FILE"
else
  echo "✅ No lock file found."
fi

echo "🚀 Starting development server..."
npm run dev
