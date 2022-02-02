import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { InningContext } from "../context/InningContext";
import { useParams } from "react-router-dom";

export const InningStats = (props) => {
    const parameters = useParams();
    const { FirstBat, FirstBowl, SecondBat, SecondBowl } = useContext(InningContext)
    const [firstInningBat, setFirstInningBat] = FirstBat;
    const [firstInningBowl, setFirstInningBowl] = FirstBowl;
    const [secondInningBat, setSecondInningBat] = SecondBat;
    const [secondInningBowl, setSecondInningBowl] = SecondBowl;

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/${parameters.id}`);
                setFirstInningBat(response.data.data.inningOneBatter);
                setSecondInningBowl(response.data.data.inningTwoBowler);
                setSecondInningBat(response.data.data.inningTwoBatter);
                setFirstInningBowl(response.data.data.inningOneBowler);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (<div className="list-group">
  <table className="table table-hover bg-primary">

    <thead>
        <tr className="bg-primary">
            <th scope="col">Player ID</th>
            <th scope="col">Player Name</th>
            <th scope="col">Runs</th>
            <th scope="col">Balls Faced</th>
            <th scope="col">Strike Rate</th>
        </tr>
    </thead>
    <tbody>
        {firstInningBat && firstInningBat.map(el => {return(
            <tr key = {el.player_id}>  {/*onClick={() => handleVenueSelect(el.venue_id)}   onClick={() =>getMatcheData(info.match_id)}*/}
            <td>{el.player_id}</td>
            <td>{el.player_name}</td>
            <td>{el.runs}</td>
            <td>{el.balls_faced}</td>
            <td>{el.strike_rate}</td>
            </tr>
        )
        })}
    </tbody>
  </table>

    <table className="table table-hover bg-primary">

    <thead>
        <tr className="bg-primary">
            <th scope="col">Player Name</th>
            <th scope="col">Balls Bowled</th>
            <th scope="col">Runs Given</th>
        </tr>
    </thead>
    <tbody>
        {secondInningBowl && secondInningBowl.map(el => {return(
            <tr key = {el.bowler}>  {/*onClick={() => handleVenueSelect(el.venue_id)}   onClick={() =>getMatcheData(info.match_id)}*/}
            <td>{el.bowler}</td>
            <td>{el.balls_bowled}</td>
            <td>{el.runs_given}</td>
            </tr>
        )
        })}
    </tbody>
  </table>



  <table className="table table-hover bg-primary">

    <thead>
        <tr className="bg-primary">
            <th scope="col">Player ID</th>
            <th scope="col">Player Name</th>
            <th scope="col">Runs</th>
            <th scope="col">Balls Faced</th>
            <th scope="col">Strike Rate</th>
        </tr>
    </thead>
    <tbody>
        {secondInningBat && secondInningBat.map(el => {return(
            <tr key = {el.player_id}>  {/*onClick={() => handleVenueSelect(el.venue_id)}   onClick={() =>getMatcheData(info.match_id)}*/}
            <td>{el.player_id}</td>
            <td>{el.player_name}</td>
            <td>{el.runs}</td>
            <td>{el.balls_faced}</td>
            <td>{el.strike_rate}</td>
            </tr>
        )
        })}
    </tbody>
  </table>

    <table className="table table-hover bg-primary">

    <thead>
        <tr className="bg-primary">
            <th scope="col">Player Name</th>
            <th scope="col">Balls Bowled</th>
            <th scope="col">Runs Given</th>
        </tr>
    </thead>
    <tbody>
        {firstInningBowl && firstInningBowl.map(el => {return(
            <tr key = {el.bowler}>  {/*onClick={() => handleVenueSelect(el.venue_id)}   onClick={() =>getMatcheData(info.match_id)}*/}
            <td>{el.bowler}</td>
            <td>{el.balls_bowled}</td>
            <td>{el.runs_given}</td>
            </tr>
        )
        })}
    </tbody>
  </table>

</div>);
};

export default InningStats;


