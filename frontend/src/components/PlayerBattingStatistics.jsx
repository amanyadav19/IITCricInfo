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
                setPlayerBat(response.data.data.player);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div className="list-group">
  <table className="table table-hover bg-primary">
      <tr><td>Matches</td><td>{playerBat.matches}</td></tr>
      <tr><td>Runs</td><td>{playerBat.runs}</td></tr>
      <tr><td>Four</td><td>{playerBat.four}</td></tr>
      <tr><td>Six</td><td>{playerBat.bowling_skill}</td></tr>
      <tr><td>HS</td><td>{playerBat.bowling_skill}</td></tr>
      <tr><td>Strike rate</td><td>{playerBat.bowling_skill}</td></tr>
      <tr><td>Average</td><td>{playerBat.bowling_skill}</td></tr>
  </table>
</div>);
};

export default PlayerBattingStatistics;