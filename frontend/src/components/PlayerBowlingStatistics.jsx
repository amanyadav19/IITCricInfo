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
  </table>
</div>);
};

export default PlayerBowlingStatistics;