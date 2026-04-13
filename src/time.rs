use std::time::{SystemTime, UNIX_EPOCH};

/// Returns the current time represented as a UNIX millisecond timestamp.
pub fn timestamp() -> u128 {
  let now = SystemTime::now();
  let time = now.duration_since(UNIX_EPOCH).unwrap();

  time.as_millis()
}

/// Returns the current date expressed in the ISO 8601 format.
pub fn date() -> String {
  let now = timestamp();
  let seconds = now / 1000;
  let days = seconds as i64 / 86400;

  let z = days + 719468;
  let era = if z >= 0 { z } else { z - 146096 } / 146097;
  let doe = (z - era * 146097) as u32;
  let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
  let y = yoe as i64 + era * 400;
  let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
  let mp = (5 * doy + 2) / 153;
  let d = doy - (153 * mp + 2) / 5 + 1;
  let m = if mp < 10 { mp + 3 } else { mp - 9 };
  let y = if m <= 2 { y + 1 } else { y };

  format!("{y:04}-{m:02}-{d:02}")
}
