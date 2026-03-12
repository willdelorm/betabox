import Navigation from "./Navigation";

const Layout = ({ children, theme }) => {
  return (
    <div className="w-25 vh-100 mx-auto d-flex flex-column overflow-hidden">
      <Navigation theme={theme} />
      <>{children}</>
    </div>
  );
};

export default Layout;
