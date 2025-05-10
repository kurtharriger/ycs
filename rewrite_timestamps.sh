#!/bin/bash

# Function to adjust timestamp to after hours
adjust_timestamp() {
    local timestamp=$1
    local hour=$(date -r "$timestamp" "+%H")
    local minute=$(date -r "$timestamp" "+%M")
    local second=$(date -r "$timestamp" "+%S")
    local date=$(date -r "$timestamp" "+%Y-%m-%d")

    # If hour is between 8 and 17 (8 AM to 5 PM), move to 6 PM
    if [ "$hour" -ge 8 ] && [ "$hour" -lt 17 ]; then
        timestamp=$(date -j -f "%Y-%m-%d %H:%M:%S" "$date 18:00:00" "+%s")
    fi

    echo "$timestamp"
}

export -f adjust_timestamp

git filter-branch --env-filter '
    if [ "$GIT_COMMITTER_DATE" ]; then
        timestamp=$(date -j -f "%a %b %d %H:%M:%S %Y %z" "$GIT_COMMITTER_DATE" "+%s")
        new_timestamp=$(adjust_timestamp "$timestamp")
        new_date=$(date -r "$new_timestamp" "+%a %b %d %H:%M:%S %Y %z")
        export GIT_COMMITTER_DATE="$new_date"
    fi
    if [ "$GIT_AUTHOR_DATE" ]; then
        timestamp=$(date -j -f "%a %b %d %H:%M:%S %Y %z" "$GIT_AUTHOR_DATE" "+%s")
        new_timestamp=$(adjust_timestamp "$timestamp")
        new_date=$(date -r "$new_timestamp" "+%a %b %d %H:%M:%S %Y %z")
        export GIT_AUTHOR_DATE="$new_date"
    fi
' --tag-name-filter cat -- --all