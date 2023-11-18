export class TimeUtility {
  static hoursBetween(startDate: Date, endDate: Date) {
    return Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60),
    );
  }
}
