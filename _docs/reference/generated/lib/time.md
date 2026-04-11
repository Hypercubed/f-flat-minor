---
title: Time library
summary: Reference for UTC calendar conversion and formatting words exported by the top-level `time` module.
order: 114
---

# Time library reference

This page lists the public words currently defined in the top-level `time` library module.

## `utc.ffp`

Source: `ff/lib/time/utc.ffp`  
Import: `.import <time/utc>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `leap-year?` | `year -- flag` | Tests whether a Gregorian year is a leap year. |
| `days/year` | `year -- days` | Returns the number of days in a year. |
| `days/month` | `year month -- days` | Returns the number of days in a month for a given year. |
| `sod>hms` | `sod -- hour minute second` | Converts seconds-of-day into hour, minute, and second fields. |
| `days>ymd` | `days -- year month day` | Converts days since the Unix epoch into a UTC date. |
| `epoch>utc` | `epoch -- year month day hour minute second` | Converts non-negative Unix epoch seconds into UTC fields. |
| `utc>iso8601` | `year month day hour minute second -- {prints YYYY-MM-DDTHH:MM:SSZ}` | Prints UTC fields as an ISO 8601 timestamp. |
| `epoch>iso8601` | `epoch -- {prints UTC ISO-8601 string}` | Converts an epoch timestamp and prints it as ISO 8601 UTC. |
