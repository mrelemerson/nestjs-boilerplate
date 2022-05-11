import { DateTime, DateTimeUnit } from 'luxon';

export class TtlHelper {
  static endOf(unit: DateTimeUnit) {
    const now = DateTime.now();

    return Math.trunc(
      now.endOf(unit).diff(now, 'seconds').toObject().seconds ?? 0,
    );
  }
}
