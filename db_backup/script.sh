#!/bin/ash
su - postgres -c "pg_dump -h postgres_trailblaze -d postgres -U postgres > /var/lib/postgresql/backup.sql"