export function currencyFormatter(value: number, locale = "id-ID") {
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(value);
}
