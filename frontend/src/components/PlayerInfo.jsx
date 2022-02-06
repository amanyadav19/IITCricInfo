import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {PlayerInfoContext} from "../context/PlayerInfoContext";
import { useParams } from "react-router-dom";
export const PlayerInfo = (props) => {
    const parameters = useParams();
    const {player, setPlayer} = useContext(PlayerInfoContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/players/info/${parameters.id}`);
                setPlayer(response.data.data.player);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div class="container-fluid">
    <div class="table-responsive">
    <table className="table table-hover table-bordered table-striped">
        <tbody>
      <tr><td>Player Name</td><td>{player.player_name}</td></tr>
      <tr><td>Country</td><td>{player.country_name}</td></tr>
      <tr><td>Batting Style</td><td>{player.batting_hand}</td></tr>
      <tr><td>Bowling Skill</td><td>{player.bowling_skill}</td></tr>
      </tbody>
  </table>
  </div>
</div>);
};

export default PlayerInfo;