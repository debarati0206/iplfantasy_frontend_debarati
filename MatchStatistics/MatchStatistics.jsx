import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import AdminHeader from "../AdminDashboard/AdminHeader/AdminHeader";
import "./matchstatistics.css";
function MatchStatistics() {
  const [matches, setMatches] = useState([]);
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AdminService.getMatches().then((response) => {
      setMatches(response.data);
    });
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setAdmin(foundUser);
    }
  }, []);
  if (admin === "") {
    return navigate("/master_admin");
  }
  return (
    <div>
      <AdminHeader />
      <div className="container-fluid p-0 manage_team">
        <div className="manage_container">

          <h1 className="text-center p-4 mt-4 text-uppercase fs-4 ">====Matches====</h1>
          {matches && matches.length > 0 ? (
            matches.map((match) => (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="col-lg-8 col-md-6 col-12 d-flex flex-column justify-content-around bg-light rounded-3 match_card">
                  <div className="ms-3 mt-2">Match {match.match_id}</div>
                  <div className="d-flex flex-row justify-content-around align-items-center">
                    <div className="d-flex flex-column align-items-center">
                      <img
                        className="img-fluid stats_img"
                        src={match.teamdetails.photos}
                        alt="Logo"
                      />
                      <h6 className="mt-2">{match.teamdetails.team_name}</h6>
                    </div>
                    <div className="d-flex flex-column  align-items-center ">
                      <p className="m-0 text-muted fs-2">Vs</p>
                      <p className="m-0 date">
                        {match.match_date} | {match.match_time}
                      </p>
                      <p className="text-danger fw-bold text-capitalize">
                        {match.winner}
                      </p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        className="img-fluid stats_img"
                        src={match.teamdetails2.photos}
                        alt="Logo"
                      />
                      <h6 className="mt-2">{match.teamdetails2.team_name}</h6>
                    </div>
                  </div>
                  <div className="text-center">
                    {match.status!=="Finished" ?
                    match.status!=="Cancelled"?<div>
                    <Link
                      to={`/admin/result/${match.match_id}`}
                      className="btn btn-success me-3 mb-4"
                    >
                      Update Result
                    </Link>
                   
                    </div> : <div>
                    <button
                      className="btn btn-success mb-4 me-3 disabled"
                    >
                      Update Result
                    </button>
                    
                    </div>: <div>
                    <button
                      className="btn btn-success mb-4 me-3 disabled"
                    >
                      Update Result
                    </button>
                    
                    </div> }
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img className="w-25" src="../img/upmatch_image.png" alt="" />
              <h3 className="p-3 m-3 nomatch_header fw-bold ">
                No earlier matches available...
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchStatistics;
