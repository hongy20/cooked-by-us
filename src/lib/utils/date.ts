export const formatDateForJsonLd = (date: Date) =>
  new Intl.DateTimeFormat("en-CA").format(date); // en-CA uses YYYY-MM-DD

export const formatDateForHuman = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
