import Header from "../components/HeaderV2.tsx";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const WithNav = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default WithNav;
