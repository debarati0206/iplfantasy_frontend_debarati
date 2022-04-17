import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./teamstatistics.css";
import AdminService from "../../Services/AdminService";

function TeamStatistics() {
  const [user, setUser] = useState();
  const [matches, setMatches] = useState();
  const [teams, setTeams] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    AdminService.getMatches().then((res) => {
      setMatches(res.data);
    });

    AdminService.getTeams().then((res) => {
      setTeams(res.data);
    });
  }, []);

  if (!user) {
    return navigate("/daily/home");
  }

  return (
    <div className="container-fluid teamParent ">
      {matches && matches.length > 0 && matches.map((match) => <div></div>)}
      <div className="row">
        <div className="col-md-8 col-lg-5 col-12 p-0 d-flex flex-column align-items-center registerContainer bg-light">
          <div className="img-fluid upmatch_icon">
            <img src="../img/upmatch_image.png" alt="" />
          </div>
          <h1>Points Table</h1>

          <table class="table table-success text-center table-hover">
            <thead>
              <tr>
                <th scope="col">Team Name</th>
                <th scope="col">Played</th>
                <th scope="col">Won</th>
                <th scope="col">Lost</th>
                <th scope="col">Tied</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {teams &&
                teams.length > 0 &&
                teams.map((team) => (
                  <tr key={team.team_id}>
                    <td>{team.team_name}</td>
                    <td>
                      {
                        matches.filter(
                          (match) =>
                            (match.teamdetails.team_name === team.team_name ||
                              match.teamdetails2.team_name ===
                                team.team_name) &&
                            match.status === "Finished"
                        ).length
                      }
                    </td>
                    <td>
                      {
                        matches.filter(
                          (match) =>
                            (match.teamdetails.team_name === team.team_name ||
                              match.teamdetails2.team_name ===
                                team.team_name) &&
                            match.status === "Finished" &&
                            match.winner.split(" ")[0] === team.team_name
                        ).length
                      }
                    </td>
                    <td>
                      {
                        matches.filter(
                          (match) =>
                            (match.teamdetails.team_name === team.team_name ||
                              match.teamdetails2.team_name ===
                                team.team_name) &&
                            match.status === "Finished" &&
                            match.winner.split(" ")[0] !== team.team_name
                        ).length
                      }
                    </td>
                    <td>
                      {
                        matches.filter(
                          (match) =>
                            (match.teamdetails.team_name === team.team_name ||
                              match.teamdetails2.team_name ===
                                team.team_name) &&
                            match.status === "Finished" &&
                            match.winner === "Match Tied"
                        ).length
                      }
                    </td>
                    <td>
                      {2 *
                        matches.filter(
                          (match) =>
                            (match.teamdetails.team_name === team.team_name ||
                              match.teamdetails2.team_name ===
                                team.team_name) &&
                            match.status === "Finished" &&
                            match.winner.split(" ")[0] === team.team_name
                        ).length +
                        matches.filter(
                          (match) =>
                            (match.teamdetails.team_name === team.team_name ||
                              match.teamdetails2.team_name ===
                                team.team_name) &&
                            match.status === "Finished" &&
                            match.winner === "Match Tied"
                        ).length}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="col-md-8 col-lg-5 col-12   d-flex flex-row align-items-center justify-content-between fixed-bottom  p-2 ps-4 pe-4 bg-light bottom_navbar ">
            <Link to="/daily/home">
              <div className="d-flex flex-column align-items-center ">
                <div>
                  <i class="fa-solid fa-house"></i>
                </div>
                <div>Home</div>
              </div>
            </Link>
            <Link to="">
              <div className="d-flex flex-column align-items-center">
                <div>
                  <i class="fa-solid fa-trophy"></i>
                </div>
                <div>My Matches</div>
              </div>
            </Link>
            <Link to="/leaderboard">
              <div className="d-flex flex-column align-items-center">
                <div>
                  <i class="fa-solid fa-user"></i>
                </div>
                <div>Leaderboard</div>
              </div>
            </Link>
            <Link to="/daily/teamstats">
              <div className="d-flex flex-column align-items-center">
                <div>
                  <i class="fa-solid fa-ellipsis"></i>
                </div>
                <div>Team Stats</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamStatistics;
