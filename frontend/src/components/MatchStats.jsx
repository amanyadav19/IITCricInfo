import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { MatchContext } from "../context/MatchContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const MatchStats = (props) => {
    const parameters = useParams();
    const history = useHistory();
    const { FirstBat, FirstBowl, SecondBat, SecondBowl, FirstBattingBowling } = useContext(MatchContext)
    const [firstInningBat, setFirstInningBat] = FirstBat;
    const [firstInningBowl, setFirstInningBowl] = FirstBowl;
    const [secondInningBat, setSecondInningBat] = SecondBat;
    const [secondInningBowl, setSecondInningBowl] = SecondBowl;
    const [firstBattingBowling, setFirstBattingBowling] = FirstBattingBowling;

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/${parameters.id}`);
                setFirstInningBat(response.data.data.inningOneBatter);
                setSecondInningBowl(response.data.data.inningTwoBowler);
                setSecondInningBat(response.data.data.inningTwoBatter);
                setFirstInningBowl(response.data.data.inningOneBowler);
                setFirstBattingBowling(response.data.data.firstBattingBowling);
            } 
            finally {
            }
        };
        fetchData();
    }, []);

    const handlePlayerSelect = (id) => {
        history.push(`/players/${id}`); //////////// see this
    }

  return (<div className="list-group">

    <h3>Innings One</h3>

            {firstBattingBowling && firstBattingBowling.map(el => {return(
            <h2>{el.first_batting}</h2>
            )
            })}


  <table className="table table-hover bg-primary">      
    <thead>
        <tr className="bg-primary">
            <th scope="col">Batter</th>
            <th scope="col">Runs</th>
            <th scope="col">Fours</th>
            <th scope="col">Sixes</th>
            <th scope="col">Balls Faced</th>
        </tr>
    </thead>
    <tbody>
        {firstInningBat && firstInningBat.map(el => {return(
            <tr key = {el.player_id}  onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.player_name}</td>
            <td>{el.runs}</td>
            <td>{el.fours}</td>
            <td>{el.sixes}</td>
            <td>{el.balls_faced}</td>
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
            <tr key = {el.bowler} onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.bowler}</td>
            <td>{el.balls_bowled}</td>
            <td>{el.runs_given}</td>
            </tr>
        )
        })}
    </tbody>
  </table>


        {firstBattingBowling && firstBattingBowling.map(el => {return(
            <h2>{el.first_bowling}</h2>
            )
            })}

  <table className="table table-hover bg-primary">

    <thead>
        <tr className="bg-primary">
            <th scope="col">Batter</th>
            <th scope="col">Runs</th>
            <th scope="col">Fours</th>
            <th scope="col">Sixes</th>
            <th scope="col">Balls Faced</th>
        </tr>
    </thead>
    <tbody>
        {secondInningBat && secondInningBat.map(el => {return(
            <tr key = {el.player_id} onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.player_name}</td>
            <td>{el.runs}</td>
            <td>{el.fours}</td>
            <td>{el.sixes}</td>
            <td>{el.balls_faced}</td>
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
            <tr key = {el.bowler} onClick={() => handlePlayerSelect(el.player_id)}>
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

export default MatchStats;


