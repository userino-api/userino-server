#!/bin/bash

# PLATFORMS are list of available architectures for node.js image
NODE_PLATFORMS="linux/amd64,linux/arm/v7,linux/arm64/v8,linux/ppc64le,linux/s390x"
PLATFORMS="$NODE_PLATFORMS"
PLATFORMS="linux/amd64"

####
## Do not forget to update version before running this script!
###
VERSION=0.0.1
source env-ci-version
[[ $PROJECT_VERSION ]] && VERSION="$PROJECT_VERSION";

docker context create buildx

echo '===     Build analyst-layer image     ===='
IMAGE_NAME="zvsx001/userino-server"
docker buildx create --platform "$PLATFORMS" --append --use buildx --name userino-server;
docker buildx build --no-cache --platform "$PLATFORMS" . --push -t "$IMAGE_NAME:$VERSION" -t "$IMAGE_NAME:latest";
