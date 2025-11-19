export const formatDateForJsonLd = (date: Date) =>
  new Intl.DateTimeFormat("en-CA").format(date); // en-CA uses YYYY-MM-DD
