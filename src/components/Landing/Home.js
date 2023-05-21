import React, { useState, useEffect,useContext } from "react";
// import { Link } from "react-router-dom";
import hero from "../../img/Logo_1200x1200.png";
import card1 from "../../img/77-772540_wikiproject-scouting-wood-badge-3-beads-wood-badge-3-beads.png";
import card2 from "../../img/Layer 2.png";
import trainerContext from "../../contexts/trainerContext";
import alertContext from "../../contexts/Alert/alertContext";

const Home = () => {
  const [count, setCount] = useState({ assistantLeaderTrainerCount: 0, leaderTrainerCount: 0 });

  const  contextAlert = useContext(alertContext);
  const {showAlert} = contextAlert;

  const context = useContext(trainerContext);
  const {countOfTrainers} = context;
  
  useEffect(() => {
    const fetchCount = async () => {
      const response = await countOfTrainers();
      if(response?.error) showAlert(response.error,"danger");
      if(response?.status)setCount(response.trainerCount);
    }
    fetchCount();
  }, []);  

  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container-fluid" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Managing Adults in Scouting</h1>
              <h2>
                SCOUTING WOULD NOT EXIST AROUND THE WORLD WITHOUT THE MILLIONS
                OF ADULTS MOSTLY VOLUNTERS AND SOME PAID STAFF WHO SUPPORT THE
                MOVEMENT IN A WIDE A RANGE OF ROLES AND FUNCTIONS
              </h2>
            </div>
            <div
              className="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple-logo">
                <img src={hero} className="img-fluid animated" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Count of the trainers Card */}
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
              One Point Solution for Adults in Scouting
            </h2>
          </div>
          <div className="row gy-5">
            <div
              className="col-lg-4 col md-3 d-flex align-items-stretch"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="icon-box iconbox-blue">
                <div className="icon">
                  <img src={card2} width="100px" alt="" />
                </div>
                <h4>Leader Trainer</h4>
                <p>{count["leaderTrainerCount"]}</p>
              </div>
            </div>
            <div
              className="col-lg-4 col md-3 d-flex align-items-stretch"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="icon-box iconbox-orange ">
                <div className="icon">
                  <img src={card1} width="100px" alt="" />
                </div>
                <h4>Assistant Leader Trainer</h4>
                <p>{count["assistantLeaderTrainerCount"]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
