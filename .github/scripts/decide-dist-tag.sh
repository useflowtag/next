#!/usr/bin/env bash
set -euo pipefail

TAG="${GITHUB_REF_NAME}"              # e.g. v1.2.3 or v1.2.4-canary.0
VERSION="${TAG#v}"                    # strip leading v
echo "version=$VERSION" >> "$GITHUB_OUTPUT"

if [[ "$VERSION" == *"-canary."* || "$VERSION" == *"-canary"* ]]; then
  echo "dist_tag=canary" >> "$GITHUB_OUTPUT"
else
  echo "dist_tag=latest" >> "$GITHUB_OUTPUT"
fi

echo "Determined version: $VERSION"
echo "Determined dist-tag: $(grep dist_tag "$GITHUB_OUTPUT" | cut -d= -f2)"
