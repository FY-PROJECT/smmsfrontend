import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from "../../img/footer-img.png";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <p>
                <img src={logo1} height="280px" style={{ marginTop: "10%", marginBottom: "-2%", }} alt="" />
              </p>
            </div>
            <div className="col-lg-7 col-md-6 mb-4 mb-md-0">
              <h4 style={{ color: "#fff", fontSize: "25px", position: "relative", left: "50%", bottom: "140%", }}>
                THE BHARAT SCOUTS AND GUIDES
                NATIONAL TRAINING CENTER<br />
                (MANAGING ADULTS IN SCOUTING)
              </h4>
            </div>
            <div className="col-lg-5">
              <ul>
                {(!localStorage.getItem('token')) ? <li><Link className="admin-login scrollto active" to="/login">ADMIN &nbsp;LOGIN</Link></li> :
                  <li><Link className="admin-login scrollto active" to="/admin">Dashboard</Link></li>}
              </ul>
            </div>
          </div>
        </div>

        <div className="container p-4">
            <div className="row">
              <div className="col-lg-6">
                <p className="text-white mb-0">
                  &copy; 2023 Aatish Gupta | Sudhir Raul
                </p>
              </div>
              
              <div className="container col-lg-6">
                <div className="social-media">
                <h5 className="text-white">Follow us : &nbsp;
                  <Link to="" title="twitter">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link to="" title="facebook">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                  <Link to="" title="instagram">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        

      </footer>
    </>
  )
}

export default Footer;
