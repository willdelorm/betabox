import Navigation from "./Navigation";

const Layout = ({ children, theme }) => {
  return (
    <div className="h-100 d-flex flex-column overflow-hidden">
      <Navigation theme={theme} />
      <>{children}</>
    </div>
  );
};

export default Layout;
