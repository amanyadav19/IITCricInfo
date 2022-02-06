import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { MatchContext } from "../context/MatchContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const MatchStats = (props) => {
    const parameters = useParams();
    const history = useHistory();
    const { FirstBat, FirstBowl, SecondBat, SecondBowl, FirstBattingBowling, MatchInfo, Umpires, TeamOnePlayers, TeamTwoPlayers } = useContext(MatchContext)
    const [firstInningBat, setFirstInningBat] = FirstBat;
    const [firstInningBowl, setFirstInningBowl] = FirstBowl;
    const [secondInningBat, setSecondInningBat] = SecondBat;
    const [secondInningBowl, setSecondInningBowl] = SecondBowl;
    const [firstBattingBowling, setFirstBattingBowling] = FirstBattingBowling;
    const [matchInfo, setMatchInfo] = MatchInfo;
    const [umpires, setUmpires] = Umpires;
    const [teamOnePlayers, setTeamOnePlayers] = TeamOnePlayers;
    const [teamTwoPlayers, setTeamTwoPlayers] = TeamTwoPlayers;

    
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/${parameters.id}`);
                setFirstInningBat(response.data.data.inningOneBatter);
                setSecondInningBowl(response.data.data.inningTwoBowler);
                setSecondInningBat(response.data.data.inningTwoBatter);
                setFirstInningBowl(response.data.data.inningOneBowler);
                setFirstBattingBowling(response.data.data.firstBattingBowling);
                setMatchInfo(response.data.data.matchInfo);
                setUmpires(response.data.data.umpires);
                setTeamOnePlayers(response.data.data.teamOnePlayers);
                setTeamTwoPlayers(response.data.data.teamTwoPlayers);
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

    <h3>Innings 1</h3>

    {firstBattingBowling && firstBattingBowling.map(el => {return(
    <h2>Batting: {el.first_batting}</h2>
    )})}

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

    <h2>Bowling</h2>
    <table className="table table-hover bg-primary">
        <thead>
            <tr className="bg-primary">
                <th scope="col">Bowler</th>
                <th scope="col">Balls Bowled</th>
                <th scope="col">Runs Given</th>
                <th scope="col">Wickets</th>
            </tr>
        </thead>
        <tbody>
            {firstInningBowl && firstInningBowl.map(el => {return(
                <tr key = {el.bowler} onClick={() => handlePlayerSelect(el.player_id)}>
                <td>{el.player_name}</td>
                <td>{el.balls_bowled}</td>
                <td>{el.runs_given}</td>
                <td>{el.wickets}</td>
                </tr>
            )
            })}
        </tbody>
    </table>

    {firstBattingBowling && firstBattingBowling.map(el => {return(
    <>Extra Runs: {el.innings_one_extra_runs}
    <p>Score: {el.innings_one_runs}</p>
    Wickets: {el.first_innings_wicket}</>
    )})}


    <h3>Innings 2</h3>

    {firstBattingBowling && firstBattingBowling.map(el => {return(
    <h2>Batting: {el.first_bowling}</h2>
    )})}
    


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
            <th scope="col">Bowler</th>
            <th scope="col">Balls Bowled</th>
            <th scope="col">Runs Given</th>
            <th scope="col">Wickets</th>
        </tr>
    </thead>
    <tbody>
        {secondInningBowl && secondInningBowl.map(el => {return(
            <tr key = {el.bowler} onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.player_name}</td>
            <td>{el.balls_bowled}</td>
            <td>{el.runs_given}</td>
            <td>{el.wickets}</td>
            </tr>
        )
        })}
    </tbody>
  </table>


    {firstBattingBowling && firstBattingBowling.map(el => {return(
    <>Extra Runs: {el.innings_two_extra_runs}
    <p>Score: {el.innings_two_runs}</p>
    Wickets: {el.second_innings_wicket}</>
    )
    })}


    <h1>Match Information</h1>

    <table className="table table-hover bg-primary">

    <thead>
        <tr className="bg-primary">
            <th scope="col">Field</th>
            <th scope="col">Information</th>
        </tr>
    </thead>
    <tbody>
        <tr key = "match">
        <td>Match:</td>
        <td>
            {matchInfo && matchInfo.map(el => {return(
            <>{el.match_id}, {el.teamone} v/s {el.teamtwo}, {el.season_year}</>
            )})}
        </td>
        </tr>
        <tr key = "toss">
        <td>Toss:</td>
        <td>
            {matchInfo && matchInfo.map(el => {return(
            <>{el.toss}</>
            )})}
        </td>
        </tr>
        <tr key = "venue">
        <td>Venue:</td>
        <td>
            {matchInfo && matchInfo.map(el => {return(
            <>{el.venue_name}, {el.city_name}, {el.country_name}</>
            )})}
        </td>
        </tr>
        <tr key = "umpires">
        <td>Umpires:</td>
        <td>
            {umpires && umpires.map(el => {return(
            <>{el.umpire_name}({el.role_desc}) </>
            )})}
        </td>
        </tr>
        <tr key = "teamOnePlayers">
        <td>Playing XI of team1:</td>
        <td>
            {teamOnePlayers && teamOnePlayers.map(el => {return(
            <>{el.player_name} {(el.role_desc=='Captain' || el.role_desc=='Keeper' || el.role_desc=='CaptainKeeper') && <>({el.role_desc})</>} </>
            )})}
        </td>
        </tr>
        <tr key = "teamTwoPlayers">
        <td>Playing XI of team2:</td>
        <td>
            {teamTwoPlayers && teamTwoPlayers.map(el => {return(
            <>{el.player_name} {(el.role_desc=='Captain' || el.role_desc=='Keeper' || el.role_desc=='CaptainKeeper') && <>({el.role_desc})</>} </>
            )})}
        </td>
        </tr>
    </tbody>
  </table>

</div>);
};

export default MatchStats;


