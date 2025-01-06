import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import bglayout from "../../assets/images/layerbg.svg"
import Navbar from "../../Components/Navbar/Navbar";
// import Navbar from "../../Components/NavbarMe/Navbar";

export default function Layout() {

  return (
    <>
      <Navbar />
        <div className={`container mt-20 px-4 ${style.Layout} relative  `} style={{backgroundImage:`url(${bglayout})`}}>
          <Outlet />
        </div>
      <Footer />
    </>
  );
}
