export const formatDate = (date) => {
  if (!date) return null;
  const rawDate = new Date(date);
  const year = rawDate.getFullYear();
  const month = String(rawDate.getMonth() + 1).padStart(2, "0");
  const day = String(rawDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
