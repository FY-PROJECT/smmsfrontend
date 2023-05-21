import React from "react";

const Card = (props) => {
    let {unit,count} = props
  return (
    <>
        <div className="col-xl-4 col-sm-4 mb-xl-4 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      {unit}
                    </p>
                    <h5 className="font-weight-bolder">{count}</h5>
                    {/* <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +55%
                      </span>
                      since yesterday
                    </p> */}
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className={`icon icon-shape ${(unit === "Scout") ? "success" : (unit === "Rover") ? "danger" :"primary"} shadow-primary text-center rounded-circle`}>
                    <i
                      className="ni ni-money-coins text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Card;

Card.defaultProps = {
    unit: "scouting",
    count : 0
};
