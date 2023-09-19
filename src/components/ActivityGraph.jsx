import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data }) => {
  return (
    <ResponsiveBar
      data={data}
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
