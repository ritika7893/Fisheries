import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}

export default MainLayout;
