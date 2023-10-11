#!/bin/ash
pg_dump -h postgres -d postgres -U postgres > /var/lib/postgresql/backup.sql