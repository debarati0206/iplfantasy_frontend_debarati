import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import AdminHeader from "../AdminDashboard/AdminHeader/AdminHeader";

function CreateMatch() {
  const [admin, setAdmin] = useState("");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [matchdate, setMatchdate] = useState("");
  const [matchTime, setmatchTime] = useState("");
  const [MatchStadium, setMatchStadium] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [teamANameErr, setTeamANameErr] = useState("");
  const [teamBNameErr, setTeamBNameErr] = useState("");
  const [matchdateErr, setMatchdateErr] = useState("");
  const [matchTimeErr, setmatchTimeErr] = useState("");
  const [matchStadiumErr, setMatchStadiumErr] = useState("");
  const [tournamentIdErr, setTournamentIdErr] = useState("");
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [tournament, setTournament] = useState([]);
  const navigate = useNavigate();
  let isValid = false;
  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setAdmin(foundUser);
    }
    AdminService.getTeams().then((res) => {
      setTeams(res.data);
    });

    AdminService.getTournament().then((res) => {
      setTournaments(res.data);
    });
  }, []);
  if (admin === "") {
    return navigate("/master_admin");
  }

  const validateTheForm = () => {
    let teamANameErr,
      teamBNameErr,
      matchdateErr,
      matchTimeErr,
      matchStadiumErr,
      tournamentIdErr = "";
    if (teamAName === "") {
      teamANameErr = "Please select the valid first team name";
    }
    if (teamBName === "") {
      teamBNameErr = "Please select the valid second team name";
    }
    if (teamAName === teamBName) {
      teamBNameErr = "Teams name can't be same";
    }
    if (matchdate === "") {
      matchdateErr = "Please enter the valid match date";
    }
    if (matchTime === "") {
      matchTimeErr = "Please enter the valids match time";
    }
    if (MatchStadium === "") {
      matchStadiumErr = "Please enter the name of stadium";
    }
    if (tournamentId === "") {
      tournamentIdErr = "Please select the tournament name";
    }
    if (
      teamANameErr ||
      teamBNameErr ||
      matchdateErr ||
      matchTimeErr ||
      matchStadiumErr ||
      tournamentIdErr
    ) {
      setTeamANameErr(teamANameErr);
      setTeamBNameErr(teamBNameErr);
      setMatchdateErr(matchdateErr);
      setmatchTimeErr(matchTimeErr);
      setMatchStadiumErr(matchStadiumErr);
      setTournamentIdErr(tournamentIdErr);
      isValid = false;
    } else {
      setTeamANameErr(teamANameErr);
      setTeamBNameErr(teamBNameErr);
      setMatchdateErr(matchdateErr);
      setmatchTimeErr(matchTimeErr);
      setMatchStadiumErr(matchStadiumErr);
      setTournamentIdErr(tournamentIdErr);
      isValid = true;
    }
  };

  const submitTheData = () => {
    AdminService.getTeamById(teamAName).then((res) => {
      setTeamA(res.data);
    });
    AdminService.getTeamById(teamBName).then((res) => {
      setTeamB(res.data);
    });
    AdminService.getTournamentById(tournamentId).then((res) => {
      setTournament(res.data);
    });
    const matchdetails = {
      teamdetails: teamA,
      teamdetails2: teamB,
      match_date: matchdate,
      match_time: matchTime,
      match_stadium: MatchStadium,
      winner: "Pending",
      delay: "false",
      status: "Not yet started",
      tournament: tournament,
    };
    console.log(matchdetails);

    if (isValid === true) {
      AdminService.createMatch(matchdetails).then((res) => {
        alert(res.data);
      });
    }
  };
  const handleMatch = (e) => {
    e.preventDefault();
    validateTheForm();
    submitTheData();
  };
  return (
    <>
      <AdminHeader />
      <div className="container-fluid p-0 manage_team">
        <div className="manage_container">
          <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <div className="card col-lg-5 col-md-6 col-12 rounded-3">
              <h2 className="text-center mt-4 fs-4 fw-bold text-success mb-3">
                Create New Match
              </h2>
              <hr className="text-success h-" />
              <div className="p-5">
                <form>
                  <div class="mb-3 inputbox">
                    <label htmlFor="teamaname" className="form-label">
                      Team A :
                    </label>
                    <select
                      type="text"
                      className="form-control"
                      id="teamaname"
                      name="teamaname"
                      value={teamAName}
                      onChange={(e) => setTeamAName(e.target.value)}
                    >
                      <option>Select Team</option>
                      {teams &&
                        teams.length > 0 &&
                        teams.map((team) => (
                          <option value={team.team_id}>{team.team_name}</option>
                        ))}
                    </select>
                    <p className="error">{teamANameErr}</p>
                  </div>
                  <div class="mb-3 inputbox">
                    <label htmlFor="teambname" className="form-label">
                      Team B :
                    </label>
                    <select
                      type="text"
                      className="form-control"
                      id="teambname"
                      name="teambname"
                      onChange={(e) => setTeamBName(e.target.value)}
                    >
                      <option>Select Team</option>
                      {teams &&
                        teams.length > 0 &&
                        teams.map((team) => (
                          <option value={team.team_id}>{team.team_name}</option>
                        ))}
                    </select>
                    <p className="error">{teamBNameErr}</p>
                  </div>
                  <div class="mb-3 inputbox">
                    <label htmlFor="matchdate" className="form-label">
                      Match Date :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="matchdate"
                      name="matchdate"
                      onChange={(e) => setMatchdate(e.target.value)}
                    />
                    <p className="error">{matchdateErr}</p>
                  </div>
                  <div class="mb-3 inputbox">
                    <label htmlFor="matchtime" className="form-label">
                      Match Time :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="matchtime"
                      name="matchtime"
                      onChange={(e) => setmatchTime(e.target.value)}
                    />
                    <p className="error">{matchTimeErr}</p>
                  </div>
                  <div class="mb-3 inputbox">
                    <label htmlFor="matchstadium" className="form-label">
                      Match Stadium :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="matchstadium"
                      name="matchstadium"
                      onChange={(e) => setMatchStadium(e.target.value)}
                    />
                    <p className="error">{matchStadiumErr}</p>
                  </div>
                  <div class="mb-3 inputbox">
                    <label htmlFor="tournamentid" className="form-label">
                      Tournament :
                    </label>
                    <select
                      type="text"
                      className="form-control"
                      id="tournamentid"
                      name="tournamentid"
                      onChange={(e) => setTournamentId(e.target.value)}
                    >
                      <option>Select Tournament</option>
                      {tournaments &&
                        tournaments.length > 0 &&
                        tournaments.map((tournament) => (
                          <option value={tournament.tournament_id}>
                            {tournament.tournament_name}
                          </option>
                        ))}
                    </select>
                    <p className="error">{tournamentIdErr}</p>
                  </div>

                  <div className=" d-flex flex-row flex-wrap align-items-center justify-content-center">
                    <button
                      onClick={handleMatch}
                      className="btn btn-success text-center p-3 mt-2"
                    >
                      Create Match
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMatch;
