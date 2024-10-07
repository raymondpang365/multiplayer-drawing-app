#!/bin/bash

source .env.development

cross-env NODE_ENV=development NODE_OPTIONS='--inspect' next dev -- -H "$IP"