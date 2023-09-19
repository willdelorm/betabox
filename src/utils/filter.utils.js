const formatDate = (startingDate) => {
  return new Date(startingDate.toString().split(" ").slice(0, 4).join(" "));
};

export const getStartOfMonth = () => {
  let startingDate = new Date();
  startingDate.setDate(1);

  return formatDate(startingDate);
};

export const getLast3Months = () => {
  let startingDate = new Date();
  startingDate.setDate(1);
  startingDate.setMonth(startingDate.getMonth() - 2);

  return formatDate(startingDate);
};

export const getLast6Months = () => {
  let startingDate = new Date();
  startingDate.setDate(1);
  startingDate.setMonth(startingDate.getMonth() - 5);

  return formatDate(startingDate);
};

export const getStartOfYear = () => {
  let startingDate = new Date();
  startingDate.setDate(1);
  startingDate.setMonth(0);

  return formatDate(startingDate);
};
