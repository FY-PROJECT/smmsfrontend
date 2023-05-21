import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
// Components
import Alert from "./Alert";
// Static Assets
import logo1 from "../img/Bharat_Scouts_and_Guides.svg.png";
import logo2 from "../img/Group 1.png";

function Navbar() {
  let location = useLocation();

  useEffect(() => {}, [location]);

  return (
    <>
      <header
        id="header"
        className="fixed-top"
        style={{
          background: "linear-gradient(45deg, #7700ffe5 0%, #8c01f7e5 100%)",
        }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo mx-25">
            <Link to="/">
              <h4>
                <center>
                  <img src={logo1} className="" alt="" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <img src={logo2} className="" alt="" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; THE BHARAT SCOUTS
                  AND GUIDES | NATIONAL TRAINING CENTER
                </center>
              </h4>
            </Link>
          </h1>
          <Alert />
        </div>
      </header>
    </>
  );
}

export default Navbar;
