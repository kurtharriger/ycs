import datetime
try:
    from zoneinfo import ZoneInfo  # Python 3.9+
except ImportError:
    from backports.zoneinfo import ZoneInfo  # For older Python, if installed

MOUNTAIN = ZoneInfo('America/Denver')  # Mountain Time with DST


def commit_callback(commit):
    # commit.author_date and commit.committer_date are in seconds since epoch (UTC)
    for attr in ["author_date", "committer_date"]:
        ts = getattr(commit, attr)
        # Convert to UTC datetime
        dt_utc = datetime.datetime.utcfromtimestamp(ts).replace(tzinfo=datetime.timezone.utc)
        # Convert to Mountain Time (with DST)
        dt_mt = dt_utc.astimezone(MOUNTAIN)
        if 8 <= dt_mt.hour < 17:
            # Move to 6 PM Mountain Time same day
            dt_mt = dt_mt.replace(hour=18, minute=0, second=0, microsecond=0)
            # Convert back to UTC
            dt_utc_new = dt_mt.astimezone(datetime.timezone.utc)
            new_ts = int(dt_utc_new.timestamp())
            print(f"Modifying {attr} from {dt_utc} (MT: {dt_mt}) to {dt_utc_new} (timestamp: {new_ts})")
            setattr(commit, attr, new_ts)

# This script is intended to be used with:
# git filter-repo --commit-callback rewrite_commit_times.py