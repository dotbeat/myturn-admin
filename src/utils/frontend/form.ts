// input : { q: "hoge", date: new Date("2025-05-26"), page: 2 }
// output: ?q=hoge&date=2025-05-26&page=2
export function convertFormDataToUrlParams(
  data: Record<string, string | number | Date | null | undefined>,
): URLSearchParams {
  const searchParams = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof Date) {
      if (!Number.isNaN(value.getTime())) {
        searchParams.set(key, value.toISOString().slice(0, 10));
      }
    } else if (
      typeof value === "string" ||
      (typeof value === "number" && !Number.isNaN(value))
    ) {
      if (value) {
        searchParams.set(key, String(value));
      }
    }
  });
  return searchParams;
}

export class ConvertUrlParamEntry {
  private searchParams: URLSearchParams;

  constructor(searchParams: URLSearchParams) {
    this.searchParams = searchParams;
  }

  // searchParams: ?q=hoge
  // input : "q"
  // output: "hoge"
  toString(paramKey: string, defaultValue = "") {
    const paramValue = this.searchParams.get(paramKey);
    return paramValue ?? defaultValue;
  }
  // searchParams: ?page=2
  // input : "page"
  // output: 2
  toNumber(paramKey: string, defaultValue = 0) {
    const paramValue = this.searchParams.get(paramKey);
    return parseInt(paramValue ?? String(defaultValue), 10);
  }

  // searchParams: ?date=2025-05-26
  // input : "date"
  // output: new Date("2025-05-26")
  toDate(paramKey: string, defaultValue: string | null = null) {
    const paramValue = this.searchParams.get(paramKey);
    const valueAsDate = new Date(paramValue ?? "");
    return !Number.isNaN(valueAsDate.getTime())
      ? valueAsDate.toISOString().slice(0, 10)
      : defaultValue;
  }
}
