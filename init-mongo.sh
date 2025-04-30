#!/bin/bash
set -e

mongosh <<EOF
use $MONGO_INITDB_DATABASE

db.createCollection('users')

db.users.insertOne({
  username: "$ADMIN_USERNAME",
  email: "$ADMIN_EMAIL",
  role: "ADMIN"
})
EOF