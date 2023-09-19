const MONTHS_ARRAY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TIME_FILTER_VALUES = {
  "This month": 1,
  "Latest 3 months": 3,
  "Latest 6 months": 6,
};

const formatDate = (startingDate) => {
  return new Date(startingDate.toString().split(" ").slice(0, 4).join(" "));
};

const getStartOfMonth = () => {
  let startingDate = new Date();
  startingDate.setDate(1);

  return formatDate(startingDate);
};

const getLast3Months = () => {
  let startingDate = new Date();
  startingDate.setDate(1);
  startingDate.setMonth(startingDate.getMonth() - 2);

  return formatDate(startingDate);
};

const getLast6Months = () => {
  let startingDate = new Date();
  startingDate.setDate(1);
  startingDate.setMonth(startingDate.getMonth() - 5);

  return formatDate(startingDate);
};

const getStartOfYear = () => {
  let startingDate = new Date();
  startingDate.setDate(1);
  startingDate.setMonth(0);

  return formatDate(startingDate);
};

const filterSessionsByTime = (sessions, timeFilter) => {
  return sessions.filter((session) => {
    const sessionStartTime = new Date(session.startTime.seconds * 1000);
    switch (timeFilter) {
      case "This month":
        return sessionStartTime >= getStartOfMonth();
      case "Latest 3 months":
        return sessionStartTime >= getLast3Months();
      case "Latest 6 months":
        return sessionStartTime >= getLast6Months();
      case "This year":
        return sessionStartTime >= getStartOfYear();
      default:
        return true;
    }
  });
};

const createBarDataArray = (timeFilter) => {
  const newBarData = new Array(TIME_FILTER_VALUES[timeFilter]);

  for (let i = 0; i < newBarData.length; i++) {
    const monthId = MONTHS_ARRAY[new Date().getMonth() - i];
    newBarData[i] = {
      id: monthId,
      value: 0,
    };
  }

  return newBarData;
};

// filter parameter for determining data to target
const addValuesToBarData = (arr, sessions, filter) => {
  const arrToReturn = [...arr];

  sessions.forEach((session) => {
    const sessionMonth = new Date(session.startTime.seconds * 1000).getMonth();
    const monthIndex = new Date().getMonth() - sessionMonth;
    arrToReturn[monthIndex].value++;
  });

  return arrToReturn;
};

export const getBarData = (sessions, timeFilter, dataFilter) => {
  const emptyBarData = createBarDataArray(timeFilter);
  const filteredSessions = filterSessionsByTime(sessions, timeFilter);

  const barData = addValuesToBarData(
    emptyBarData,
    filteredSessions,
    dataFilter
  );

  return barData.reverse();
};
