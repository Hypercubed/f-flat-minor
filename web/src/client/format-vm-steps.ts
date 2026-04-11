export function formatVmStepCount(value: number | undefined): string {
  if (value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-US").format(value);
}
