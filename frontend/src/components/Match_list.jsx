import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import {MatchesContext} from "../context/MatchesContext";
import { useHistory } from "react-router-dom";

export const Match_list = (props) => {
    const history = useHistory();
    const {matches, setMatches} = useContext(MatchesContext);
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get("/matches/");
                setMatches(response.data.data.matches);
            } 
            finally {
            }
        };
        fetchData();
    }, []);

    const handleMatchSelect = (id) => {
        history.push(`/matches/${id}`);
    }
    
  return (<div class="container-fluid">
      <div class="card">
        <div class="table-resposive">
        <table className="table table-hover table-bordered table-striped" id="match_list">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Team 1</th>
                    <th scope="col">Team 2</th>
                    <th scope="col">Stadium Name</th>
                    <th scope="col">City Name</th>
                    <th scope="col">Result</th>
                </tr>
            </thead>
            <tbody>
                {matches && matches.map(el => {return(
                     <tr onClick={() => handleMatchSelect(el.match_id)} key = {el.match_id}>
                    <td>{el.team1}</td>
                    <td>{el.team2}</td>
                    <td>{el.stadium_name}</td>
                    <td>{el.city_name}</td>
                    <td>{el.result}</td>
                 </tr>
                )
                })}
            </tbody>
        </table>
        </div>
    </div>
  </div>);
};

export default Match_list;
