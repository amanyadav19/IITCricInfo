import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {PlayerBowlingContext} from "../context/PlayerBowlingContext";
import { useParams } from "react-router-dom";
export const PlayerBowlingStatistics = (props) => {
    const parameters = useParams();
    const {playerBowl, setPlayerBowl} = useContext(PlayerBowlingContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/players/bowl_stat/${parameters.id}`);
                setPlayerBowl(response.data.data.player);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div class="container-fluid">
  <div class="table-responsive">
  <table className="table table-hover table-bordered table-striped">
      <thead class="thead-dark">
      <tr><th>Matches</th><th>Runs</th><th>Wickets</th><th>Overs</th><th>Balls</th><th>Economy</th><th>Five Wickets</th></tr>
      </thead>
      <tbody>
      <tr><td>{playerBowl.total_matches}</td><td>{playerBowl.runs}</td><td>{playerBowl.wickets}</td><td>{playerBowl.overs}</td><td>{playerBowl.balls}</td><td>{playerBowl.economy}</td><td>{playerBowl.five_wickets}</td></tr>
      </tbody>
  </table>
  </div>
</div>);
};

export default PlayerBowlingStatistics;