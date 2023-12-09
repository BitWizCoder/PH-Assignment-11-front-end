import { Outlet, useLocation } from "react-router-dom";
import Nav from "../component/Nav";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../component/Loading";
import MainFooter from "../pages/Footer";
import { motion, useScroll } from "framer-motion";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  const { scrollYProgress } = useScroll();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white dark:bg-slate-800">
          <motion.div
            className="progress-bar"
            style={{ scaleX: scrollYProgress }}
          />
          <Nav />
          <Outlet />
          <MainFooter />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
