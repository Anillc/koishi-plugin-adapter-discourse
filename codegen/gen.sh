#!/usr/bin/env bash
set -eu

DIR=$(dirname -- "$0")
yarn openapi-typescript $DIR/openapi.json --output $DIR/../src/schema.ts