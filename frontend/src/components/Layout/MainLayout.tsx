import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Outlet /> {/* This will render the child routes */}
    </div>
  );
};

export default MainLayout;
