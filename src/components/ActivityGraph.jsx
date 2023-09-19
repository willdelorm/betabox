import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data }) => {
  return (
    <ResponsiveBar
      data={data}
      margin={{ top: 10, right: 10, bottom: 35, left: 30 }}
      padding={0.5}
      colors={"#f6d10b"}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      enableGridY={false}
      defs={[
        {
          id: "lines-pattern",
          type: "patternLines",
          spacing: 15,
          rotation: 0,
          lineWidth: 10,
          background: "#ffffff",
          color: "#f6d10b",
        },
      ]}
      fill={[{ match: "*", id: "lines-pattern" }]}
    />
  );
};

export default MyResponsiveBar;
