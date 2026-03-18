import Navigation from "./Navigation";

const Layout = ({ children, theme }) => {
  return (
    <div className="app-container vh-100 mx-auto d-flex flex-column overflow-hidden">
      <Navigation theme={theme} />
      <>{children}</>
    </div>
  );
};

export default Layout;
