// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data /* see data tab */ }) => {
  const barData = [];
  data.forEach((session) => {
    const { id, date, climbs } = session;
    const value =
      Math.round(
        (climbs.reduce((acc, climb) => acc + climb.grade, 0) / climbs.length) *
          100
      ) / 100;
    barData.push({
      id,
      date: date.toLocaleDateString("en-us", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }),
      value: climbs.length,
    });
  });

  return (
    <ResponsiveBar
      data={barData}
      // keys={["avgV"]}
      indexBy="date"
      margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
      padding={0.3}
      // valueScale={{ type: "linear" }}
      // indexScale={{ type: "band", round: true }}
      colors={{ scheme: "accent" }}
      // defs={[
      //   {
      //     id: "dots",
      //     type: "patternDots",
      //     background: "inherit",
      //     color: "#38bcb2",
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: "lines",
      //     type: "patternLines",
      //     background: "inherit",
      //     color: "#eed312",
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      // borderColor={{
      //   from: "color",
      //   modifiers: [["darker", 1.6]],
      // }}
      // axisTop={null}
      // axisRight={null}
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
      // labelSkipWidth={12}
      // labelSkipHeight={12}
      // labelTextColor={{
      //   from: "color",
      //   modifiers: [["darker", 1.6]],
      // }}
      // role="application"
      // ariaLabel="Nivo bar chart demo"
      // barAriaLabel={(e) =>
      //   e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      // }
    />
  );
};

export default MyResponsiveBar;
