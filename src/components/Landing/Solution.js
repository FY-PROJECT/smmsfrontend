import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import alertContext from "../../contexts/Alert/alertContext";
import queryContext from "../../contexts/queryContext";
import trainerContext from "../../contexts/trainerContext";

import circle1 from "../../img/Circle1.png";
import circle2 from "../../img/Circle2.png";
import circle3 from "../../img/Circle3.png";
import circle4 from "../../img/Circle4.png";
import circle5 from "../../img/Circle5.png";
import circle6 from "../../img/Circle6.png";
import "../../css/solution.css";
import trefoil from "../../img/Bharat_Scouts_and_Guides.svg.png";

const Solution = () => {

  const navigate = useNavigate();

  const context = useContext(alertContext);
  const { showAlert } = context;

  const contextQuery = useContext(queryContext);
  const { sendQuery } = contextQuery;

  const contextTrainer = useContext(trainerContext);
  const {getFormatedDate} = contextTrainer;
  

  const [bsgid, setbsgid] = useState("");
  const [dob, setdob] = useState("");
  const [bsgidFocus, setbsgidFocus] = useState(false);
  const [dobFocus, setdobFocus] = useState(false);

  const handleBSGIDChange = (e) => {
    setbsgid(e.target.value);
  };

  const handleDobChange = (e) => {
    setdob(e.target.value);
  };

  const handleSearch = async () => {
    if (bsgid === "" || dob === "") {
      showAlert("Please fill all the fields", "danger");
      return;
    }
    navigate(`/profile/${bsgid.toUpperCase()}/${getFormatedDate(dob)}`);
  };


  const [contact, setContact] = useState({ name: "", email: "", message: "" });

  const setData = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  const handleContactSubmit = async (e) => {
    const res = await sendQuery(contact);
    if (res.status) {
      showAlert("Our co-ordinators will get back soon\n(For detailed information check your mail)", "success");
    } else {
      showAlert("Some Error Occured \nPlease try after sometime", "danger");
    }
  }

  return (
    <>
      <section id="faq" className="faq" style={{ color: "white" }}>
        <div className="container" data-aos="fade-up">
          <div className="row align-items-center">
            <div className="col-lg-6 ">
              <div className="form-group">
                <div className="login-container">
                  <div
                    className={`fluid-input ${bsgidFocus
                        ? "fluid-input--focus"
                        : bsgid !== ""
                          ? "fluid-input--open"
                          : ""
                      }`}
                    style={{ margin: "15px 0" }}
                  >
                    <div className="fluid-input-holder">
                      <input
                        className="fluid-input-input"
                        type="text"
                        id="bsgid"
                        onFocus={() => setbsgidFocus(!bsgidFocus)}
                        onBlur={() => setbsgidFocus(!bsgidFocus)}
                        onChange={handleBSGIDChange}
                        minLength={5}
                        required={true}
                      />
                      <label className="fluid-input-label" htmlFor="bsgid">
                        BSG-ID
                      </label>
                    </div>
                  </div>

                  <div
                    className={`fluid-input ${dobFocus
                        ? "fluid-input--focus"
                        : dob !== ""
                          ? "fluid-input--open"
                          : ""
                      }`}
                    style={{ margin: "15px 0" }}
                  >
                    <div className="fluid-input-holder">
                      <input
                        className="fluid-input-input"
                        type="date"
                        id="dob"
                        onFocus={() => setdobFocus(!dobFocus)}
                        onBlur={() => setdobFocus(!dobFocus)}
                        onChange={handleDobChange}
                        required={true}
                      />
                      {/* <label className="fluid-input-label" htmlFor="dob">
                        DOB
                      </label> */}
                    </div>
                  </div>
                  <button className="login-button" onClick={handleSearch}>
                    <i className="fa fa-search" aria-hidden="true"></i>{" "}
                    &nbsp;Search
                  </button>
                  <p><b>OR</b></p><br/>
                  <Link
                    to={"/add"}
                    type="button"
                    className="admin-login"
                    style={{marginRight:"60%", marginLeft:"-40%"}}
                  ><i className="fa fa-add" aria-hidden="true"></i>{" "}
                  &nbsp;Add</Link>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="150"
              style={{ left: "10%" }}
            >
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple-logo">
                <img src={trefoil} className="img-fluid animated" alt="Trefoil" style={{ marginTop: "-25%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="circle-animated row">
        <div className="circle">
          <img src={circle1} alt="" />
        </div>
        <div className="circle">
          <img src={circle2} alt="" />
        </div>
        <div className="circle">
          <img src={circle3} alt="" />
        </div>
        <div className="circle">
          <img src={circle4} alt="" />
        </div>
        <div className="circle">
          <img src={circle5} alt="" />
        </div>
        <div className="circle">
          <img src={circle6} alt="" />
        </div>
      </div>

      <section id="services" className="services section-bg ">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2
              style={{
                background:
                  "linear-gradient(45deg, rgba(86, 58, 250, 0.9) 0%, rgba(116, 15, 214, 0.9) 100%)",
                color: "white",
                textAlign: "center",
              }}
            >
              SEND YOUR QUERIES TO US?
            </h2>
          </div>

          <div id="help" className="form-group mb-3">
            <div className="row">
              <div className="col-sm-12">
                <div className="fluid-input">
                  <div className="fluid-input-holder">
                    <input
                      type="text"
                      className="fluid-input-input"
                      style={{ borderBottom: "2px solid yellow" }}
                      placeholder="What do we call you?"
                      name="name"
                      onChange={setData}
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="fluid-input">
                  <div className="fluid-input-holder">
                    <input
                      type="email"
                      className="fluid-input-input"
                      style={{ borderBottom: "2px solid yellow" }}
                      placeholder="Your email address?"
                      name="email"
                      onChange={setData}
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="fluid-input">
                  <div className="fluid-input-holder">
                    <textarea
                      className="fluid-input-input"
                      style={{ borderBottom: "2px solid yellow" }}
                      placeholder="How can I help you?"
                      name="message"
                      onChange={setData}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <button id="send" onClick={handleContactSubmit}>
                <i className="fa fa-paper-plane" aria-hidden="true"></i> &nbsp;
                SEND
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Solution;
