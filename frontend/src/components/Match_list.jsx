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
        history.push(`/match/${id}`);
    }
  return (<div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Match ID</th>
                    <th scope="col">Season Year</th>
                    <th scope="col">Team 1</th>
                    <th scope="col">Team 2</th>
                    <th scope="col">Venue ID</th>
                    <th scope="col">Toss Winner</th>
                    <th scope="col">Match Winner</th>
                    <th scope="col">Toss Name</th>
                    <th scope="col">Win Type</th>
                    <th scope="col">Man Of The Match</th>
                    <th scope="col">Win Margin</th>
                    <th scope="col">Attendance</th>
                </tr>
            </thead>
            <tbody>
                {matches && matches.map(el => {return(
                     <tr key = {el.match_id}>  {/*onClick={() => handleVenueSelect(el.venue_id)}   onClick={() =>getMatcheData(info.match_id)}*/}
                    <td><a href='#' >{el.match_id}</a></td>
                    <td>{el.season_year}</td>
                    <td>{el.team1}</td>
                    <td>{el.team2}</td>
                    <td>{el.venue_id}</td>
                    <td>{el.toss_winner}</td>
                    <td>{el.match_winner}</td>
                    <td>{el.toss_name}</td>
                    <td>{el.win_type}</td>
                    <td>{el.man_of_match}</td>
                    <td>{el.win_margin}</td>
                    <td>{el.attendance}</td>  
                 </tr>
                )
                })}
            </tbody>
        </table>
  </div>);
};

export default Match_list;
