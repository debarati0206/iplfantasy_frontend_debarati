import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import AdminHeader from "../AdminDashboard/AdminHeader/AdminHeader";

function Reschedulematch() {
  const [stadium, setStadium] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [match, setMatch] = useState("");
  const [stadiumErr, setStadiumErr] = useState("");
  const [matchDateErr, setMatchDateErr] = useState("");
  const [matchTimeErr, setmatchTimeErr] = useState("");
  const [admin, setAdmin] = useState("");
  const { match_id } = useParams();
  const navigate = useNavigate();

  let isValid = false;

  useEffect(() => {
    AdminService.getMatchById(match_id).then((res) => {
      setMatch(res.data);
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

  const validateTheForm = () => {
    let teamANameErr,
      teamBNameErr,
      stadiumErr,
      matchDateErr,
      matchTimeErr,
      tournamentErr = "";

    if (stadium.length < 1) {
      stadiumErr = "Stadium name should not be empty";
    }
    if (matchDate.length < 1) {
      matchDateErr = "Match date should be empty";
    }
    if (matchTime.length < 1) {
      matchTimeErr = "Match time should not be empty";
    }
    if (
      teamANameErr ||
      teamBNameErr ||
      stadiumErr ||
      matchDateErr ||
      matchTimeErr ||
      tournamentErr
    ) {
      setStadiumErr(stadiumErr);
      setMatchDateErr(matchDateErr);
      setmatchTimeErr(matchTimeErr);
      isValid = false;
    } else {
      setStadiumErr(stadiumErr);
      setMatchDateErr(matchDateErr);
      setmatchTimeErr(matchTimeErr);
      isValid = true;
    }
  };

  const submitTheData = () => {
    const rescheduledData = {
      match_stadium: stadium,
      match_date: matchDate.toString(),
      match_time: matchTime.toString(),
      delay: "true",
      status: "Not yet started",
    };
    if (isValid === true) {
      AdminService.UpdateMatch(match_id, rescheduledData).then((response) => {
        alert(response.data);
        navigate("/admin/managetournament");
      });
    }
  };
const handleCancel=(e)=>{
  e.preventDefault();
  const details = {
    winner: "Cancelled",
    status: "Cancelled",
  };
  
    AdminService.updateResult(match_id, details).then((res) => {
      alert("Result Updated");
      navigate("/admin/matchstats");
    });
}
  const handleMatch = (e) => {
    e.preventDefault();
    validateTheForm();
    submitTheData();
  };

  return (
    <div>
      <AdminHeader />
      <div className="container-fluid p-0 manage_team">
        <div className="manage_container">
          {Object.keys(match).length > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <div className="card col-lg-5 col-md-6 col-12 rounded-3">
                <h2 className="text-center mt-4 fs-4 fw-bold text-success mb-3">
                  Reschedule Match
                </h2>
                <hr className="text-success " />
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column align-items-center justify-content-between">
                    <img
                      className="img-fluid w-25 h-25 rounded-circle "
                      src={match.teamdetails.photos}
                      alt=""
                    />
                    <h3 className="text-center fs-5 mt-2">
                      {match.teamdetails.team_name}
                    </h3>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h4 className="text-center fs-5">Vs</h4>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <img
                      className="img-fluid w-25 h-25 rounded-circle "
                      src={match.teamdetails2.photos}
                      alt=""
                    />
                    <h3 className="text-center fs-5 mt-1">
                      {match.teamdetails2.team_name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <form>
                    <div class="mb-3 inputbox">
                      <label htmlFor="stadium" className="form-label">
                        Stadium :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="stadium"
                        name="stadium"
                        defaultValue={match.match_stadium}
                        onChange={(e) => setStadium(e.target.value)}
                      />
                      <p className="error">{stadiumErr}</p>
                    </div>
                    <div class="mb-3 inputbox">
                      <label htmlFor="photo" className="form-label">
                        Match Date:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="matchdate"
                        name="matchdate"
                        defaultValue={match.match_date}
                        onChange={(e) => setMatchDate(e.target.value)}
                      />
                      <p className="error">{matchDateErr}</p>
                    </div>
                    <div class="mb-3 inputbox">
                      <label htmlFor="player" className="form-label">
                        Match Time :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="matchtime"
                        name="matchtime"
                        defaultValue={match.match_time}
                        onChange={(e) => setMatchTime(e.target.value)}
                      />
                      <p className="error">{matchTimeErr}</p>
                    </div>

                    <div className=" d-flex flex-row flex-wrap align-items-center justify-content-center">
                      <button
                        onClick={handleMatch}
                        className="btn btn-success text-center p-3 me-3 mt-2"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-danger text-center p-3 ms-3 mt-2"
                      >
                        Cancel Match
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Reschedulematch;
