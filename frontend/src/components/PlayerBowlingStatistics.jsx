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
  return (<div className="list-group">
  <table className="table table-hover bg-primary">
      <tr><td>Matches</td><td>Runs</td><td>Wickets</td><td>Overs</td><td>Balls</td><td>Economy</td><td>Five Wickets</td></tr>
      <tr><td>{playerBowl.total_matches}</td><td>{playerBowl.runs}</td><td>{playerBowl.wickets}</td><td>{playerBowl.overs}</td><td>{playerBowl.balls}</td><td>{playerBowl.economy}</td><td>{playerBowl.five_wickets}</td></tr>
  </table>
</div>);
};

export default PlayerBowlingStatistics;