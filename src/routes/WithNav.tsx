import Header from "../components/Header.tsx";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import CircularLoader from "../components/Loader";

const WithNav = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<CircularLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default WithNav;
