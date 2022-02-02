import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { InningContext } from "../context/InningContext";
import { useParams } from "react-router-dom";

export const InningStats = (props) => {
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
  return (<div className="list-group">
  <table className="table table-hover bg-primary">
      <tr><td>Player Name</td><td>{player.player_name}</td></tr>
      <tr><td>Country</td><td>{player.country_name}</td></tr>
      <tr><td>Batting Style</td><td>{player.batting_hand}</td></tr>
      <tr><td>Bowling Skill</td><td>{player.bowling_skill}</td></tr>
  </table>
</div>);
};

export default PlayerInfo;