export const formatDate = (date: string, language?: string) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return "";
  }

  return new Date(date).toLocaleDateString(language ?? "en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
