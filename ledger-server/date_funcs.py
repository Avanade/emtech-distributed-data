## Copyright alexwlchan, source: https://gist.github.com/73933442112f5ae431cc
from datetime import datetime, timedelta


def print_date(date, incl_year=True, short_months=True):
    """Prints a datetime object as a full date, stripping off any leading
    zeroes from the day (strftime() gives the day of the month as a zero-padded
    decimal number).
    """
    # %b/%B are the tokens for abbreviated/full names of months to strftime()
    if short_months:
        month_token = "%b"
    else:
        month_token = "%B"

    # Get a string from strftime()
    if incl_year:
        date_str = date.strftime("%d " + month_token + " %Y")
    else:
        date_str = date.strftime("%d " + month_token)

    # There will only ever be at most one leading zero, so check for this and
    # remove if necessary
    if date_str[0] == "0":
        date_str = date_str[1:]

    return date_str


def elapsed_time_str(past_time, max_days=5, short_months=True):
    """Accepts a datetime object or a string in ISO 8601 format and returns a
    human-readable string explaining when this time was.
    The rules are as follows:
    * If a time is within the last hour, return 'XX minutes'
    * If a time is within the last 24 hours, return 'XX hours'
    * If within the last 5 days, return 'XX days'
    * If in the same year, print the date without the year
    * If in a different year, print the date with the whole year
    These can be configured as options.
    """
    # source: https://gist.github.com/alexwlchan/73933442112f5ae431cc

    timezone = past_time.tzinfo
    now_time = datetime.now(timezone)
    elapsed_time = now_time - past_time

    # Check if the time is within the last minute
    if elapsed_time < timedelta(seconds=60):
        if elapsed_time.seconds == 1:
            time_str = "a second ago"
        else:
            time_str = "%d secs ago" % elapsed_time.seconds

    # Check if the time is within the last hour
    elif elapsed_time < timedelta(seconds=60 * 60):

        # We know that seconds > 60, so we can safely round down
        minutes = elapsed_time.seconds / 60
        if minutes == 1:
            time_str = "a minute ago"
        else:
            time_str = "%d mins ago" % minutes

    # Check if the time is within the last day
    elif elapsed_time < timedelta(seconds=60 * 60 * 24 - 1):

        # We know that it's at least an hour, so we can safely round down
        hours = elapsed_time.seconds / (60 * 60)
        if hours == 1:
            time_str = "an hour ago"
        else:
            time_str = "%d hours ago" % hours

    # Check if it's within the last N days, where N is a user-supplied
    # argument
    elif elapsed_time < timedelta(days=max_days):
        if elapsed_time.days == 1:
            time_str = "yesterday"
        else:
            time_str = "%d days ago" % elapsed_time.days

    # If it's not within the last N days, then we're just going to print
    # the date
    else:
        incl_year = past_time.year != now_time.year
        time_str = print_date(past_time, incl_year=incl_year, short_months=short_months)

    return time_str
