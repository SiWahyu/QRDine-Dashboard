export function dateFormatter(date: string, locale = "id-ID") {
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dateFormatter.format(new Date(date));
}
