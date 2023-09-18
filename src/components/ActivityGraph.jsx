// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data /* see data tab */ }) => {
  const barData = data.map((session) => {
    const { climbs, id, startTime } = session;
    const date = new Date(startTime.toDate()).toLocaleDateString("en-us");
    return {
      id,
      date,
      value: climbs.length,
    };
  });

  return (
    <ResponsiveBar
      data={barData}
      margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
      padding={0.3}
      colors={"#f6d10b"}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
    />
  );
};

export default MyResponsiveBar;
