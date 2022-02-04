import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {PlayerBattingContext} from "../context/PlayerBattingContext";
import { useParams } from "react-router-dom";
export const PlayerBattingStatistics = (props) => {
    const parameters = useParams();
    const {playerBat, setPlayerBat} = useContext(PlayerBattingContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/players/bat_stat/${parameters.id}`);
                console.log(response.data.data.player)
                setPlayerBat(response.data.data.player);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div className="list-group">
  <table className="table table-hover bg-primary">
      <tr><td>Matches</td><td>{playerBat.matches_played}</td></tr>
      <tr><td>Runs</td><td>{playerBat.total_runs}</td></tr>
      <tr><td>Four</td><td>{playerBat.fours}</td></tr>
      <tr><td>Six</td><td>{playerBat.sixes}</td></tr>
      <tr><td>Fifty</td><td>{playerBat.fifties}</td></tr>
      <tr><td>HS</td><td>{playerBat.hs}</td></tr>
      <tr><td>Strike rate</td><td>{playerBat.strike_rate}</td></tr>
      <tr><td>Average</td><td>{playerBat.average}</td></tr>
  </table>
</div>);
};

export default PlayerBattingStatistics;