import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import AdminHeader from "../AdminDashboard/AdminHeader/AdminHeader";
import "./updateResult.css";
function UpdateResult() {
  const [match, setMatch] = useState([]);
  const [winteam, setWinTeam] = useState("");
  const [wonBy, setWonBy] = useState("");
  const [score, setScore] = useState("");
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();
  let winner = "";
  let isValid = false;
  const [scoreErr, setScoreErr] = useState("");
  const [wonByErr, setWonByErr] = useState("");
  const [winteamErr, setWinteamErr] = useState("");

  const handleTheScore = () => {
    let scoreErr,
      wonByErr,
      winteamErr = "";
    if (winteam === "") {
      winteamErr = "Please select the winner team";
    }
    if (score === "") {
      scoreErr = "Score can't be empty";
    }
    if (wonBy === "") {
      wonByErr = "Please select the respective option";
    }
    if (wonBy === "run") {
      winner = `${winteam} won by ${score} run`;
    }
    if (wonBy === "wicket") {
      if (score <= 10 && score > 0) {
        winner = `${winteam} won by ${score} wickets`;
      } else {
        scoreErr = "Please Enter the valid Data";
      }
    }

    if (scoreErr || winteamErr || wonByErr) {
      setScoreErr(scoreErr);
      setWonByErr(wonByErr);
      setWinteamErr(winteamErr);
      isValid = false;
    } else {
      setScoreErr(scoreErr);
      setWonByErr(wonByErr);
      setWinteamErr(winteamErr);
      isValid = true;
    }
  };
  const { match_id } = useParams();

  useEffect(() => {
    AdminService.getMatchById(match_id).then((res) => {
      setMatch(res.data);
      //   console.log(res.data);
    });
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setAdmin(foundUser);
    }
  }, [match_id]);

  if (admin === "") {
    return navigate("/master_admin");
  }

  const submitTheResult = () => {
    const details = {
      winner: winner,
      status: "Finished",
    };
    if(isValid===true){
      AdminService.updateResult(match_id, details).then((res) => {
        alert("Result Updated");
        navigate("/admin/matchstats");
      });
    }
  };
const submitTheTied=()=>{
  const details = {
    winner: "Match Tied",
    status: "Finished",
  };
  
    AdminService.updateResult(match_id, details).then((res) => {
      alert("Result Updated");
      navigate("/admin/matchstats");
    });
  
}

  //Click Handle of update button
  const handleResult = (e) => {
    e.preventDefault();
    handleTheScore();
    submitTheResult();
  };

  const handleTied=(e)=>{
    e.preventDefault();
    submitTheTied();
  }
  return (
    <div>
      <AdminHeader />
      <div className="container-fluid p-0 manage_team">
        <div className="manage_container">
          <div className="d-flex flex-row align-items-center justify-content-around vh-100">
            <form className="d-flex flex-column col-md-6 col-12 col-lg-6 bg-white p-3 rounded-3">
              <div className=" p-4  border-0 d-flex flex-column justify-content-around">
                <h2 className="text-center">Declare Result</h2>
                <div className="win_team">
                  <label htmlFor="winnerTeam">Select winner team:</label>
                  <select
                    id="winnerTeam"
                    name="winteam"
                    className="form-control"
                    onChange={(e) => setWinTeam(e.target.value)}
                  >
                    {Object.keys(match).length > 0 ? (
                      <>
                        <option>Select Winner Team</option>
                        <option>{match.teamdetails.team_name}</option>
                        <option>{match.teamdetails2.team_name}</option>
                      </>
                    ) : (
                      <>
                        <option> Select Winner</option>
                      </>
                    )}
                  </select>

                  <p className="error">{winteamErr}</p>
                </div>
                <div className="won_radio">
                  <p>Won By :</p>
                  <div
                    className="btn-group form-control border-0"
                    role="group"
                    aria-label="Basic radio toggle button group"
                    value={wonBy}
                    onChange={(e) => setWonBy(e.target.value)}
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      value="run"
                      //   checked={wonBy === "run"}
                      id="btnradio1"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-success"
                      htmlFor="btnradio1"
                    >
                      Run
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio2"
                      value="wicket"
                      //   checked={wonBy === "wicket"}
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-success"
                      htmlFor="btnradio2"
                    >
                      Wicket
                    </label>
                  </div>
                  <p className="error">{wonByErr}</p>
                </div>
                <div className="score_div">
                  <div className="mb-3">
                    <label htmlFor="teamScore" className="form-label">
                      Enter Score
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="teamScore"
                      name="score"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    />
                    <p className="error">{scoreErr}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <button
                  onClick={handleResult}
                  className="btn btn-success p-3 m-3"
                >
                  Update Result
                </button>
                <button onClick={handleTied} className="btn btn-outline-success p-3 m-3">
                  Match Tied
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateResult;
