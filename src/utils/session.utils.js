const getProblemsCount = (climbs) => {
  return climbs.length ? climbs.length : 0;
};
const getVSum = (climbs) => {
  return climbs.length
    ? climbs.reduce((acc, climb) => (acc += climb.grade), 0)
    : 0;
};
const getAvgV = (climbs) => {
  return climbs.length
    ? Math.floor(
        climbs.reduce((acc, climb) => (acc += climb.grade), 0) / climbs.length
      )
    : 0;
};
const getProjectsCount = (climbs) => {
  return climbs.filter((climb) => climb.style === "Project").length;
};

const getAvgRpe = (climbs) => {
  return (
    climbs.reduce((totalRpe, climb) => {
      return totalRpe + climb.effort;
    }, 0) / climbs.length
  );
};

export const sessionStats = (climbs) => {
  return {
    problemsCount: getProblemsCount(climbs),
    vSum: getVSum(climbs),
    avgV: getAvgV(climbs),
    projectsCount: getProjectsCount(climbs),
    avgRpe: getAvgRpe(climbs),
  };
};
