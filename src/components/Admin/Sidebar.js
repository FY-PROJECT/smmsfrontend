import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../../img/Bharat_Scouts_and_Guides.svg.png";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  
  return (
    <>
      <aside
        className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
        id="sidenav-main"
        style={{
          // overflow: "-moz-scrollbars-none",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::WebkitScrollbar": {
            display: "none",
            overflow: "hidden",
          },
        }}
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <Link
            className="navbar-brand m-0"
            to="/"
          >
            <h4><img
              src={logo1}
              className="navbar-brand-img h-100"
              alt="main_logo"
            />&nbsp;&nbsp;
            <span className="ms-1 font-weight-bold">SMMS</span></h4>
          </Link>
        </div>
        <hr className="horizontal dark mt-0" />
        <div
          className="collapse navbar-collapse w-auto  max-height-vh-100 h-100"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/add">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                </div>
                <span className="nav-link-text ms-1">Add Trainer</span>
              </Link>
            </li>
           
            <li className="nav-item mt-3">
             <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-11">
                Contact
              </h6>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/admin/query">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-single-02 text-dark text-sm opacity-10"></i>
                </div>
                <span className="nav-link-text ms-1">Query</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/admin/querylog">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-single-copy-04 text-warning text-sm opacity-10"></i>
                </div>
                <span className="nav-link-text ms-1">Query Log</span>
              </Link>
            </li>

            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-11">
                Access
              </h6>
            </li>
            <li className="nav-item">
              <Link className="nav-link " onClick={handleLogout}>
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-single-02 text-dark text-sm opacity-10"></i>
                </div>
                <span className="nav-link-text ms-1">Logout</span>
              </Link>
            </li>
          </ul>
        </div>  
      </aside>
    </>
  );
};

export default Sidebar;
