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

    <center><h3>Innings 1</h3></center>

    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <h5>Batting: {el.first_batting}</h5>
    )})}</center>

  <div class="container-fluid table-responsive py-5">
  <div class="table-resposive"> 
  <table className="table table-hover table-bordered table-striped">      
    <thead className="thead-dark">
        <tr>
            <th scope="col">Batter</th>
            <th scope="col">Runs</th>
            <th scope="col">Fours</th>
            <th scope="col">Sixes</th>
            <th scope="col">Balls Faced</th>
        </tr>
    </thead>
    <tbody>
        {firstInningBat && firstInningBat.map(el => {return(
            <tr key = {el.player_id}>
            <td onClick={() => handlePlayerSelect(el.player_id)}><a href="">{el.player_name}</a></td>
            <td>{el.runs}</td>
            <td>{el.fours}</td>
            <td>{el.sixes}</td>
            <td>{el.balls_faced}</td>
            </tr>
        )
        })}
    </tbody>
  </table>
  </div>
  </div>

    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <h5>Bowling: {el.first_bowling}</h5>
    )})}</center>

    <div class="container-fluid table-responsive py-5">
    <div class="table-resposive">
    <table className="table table-hover table-bordered table-striped">
        <thead className="thead-dark">
            <tr>
                <th scope="col">Bowler</th>
                <th scope="col">Balls Bowled</th>
                <th scope="col">Runs Given</th>
                <th scope="col">Wickets</th>
            </tr>
        </thead>
        <tbody>
            {firstInningBowl && firstInningBowl.map(el => {return(
                <tr key = {el.bowler} onClick={() => handlePlayerSelect(el.player_id)}>
                <td onClick={() => handlePlayerSelect(el.player_id)}><a href="">{el.player_name}</a></td>
                <td>{el.balls_bowled}</td>
                <td>{el.runs_given}</td>
                <td>{el.wickets}</td>
                </tr>
            )
            })}
        </tbody>
    </table>
    </div>
    </div>

    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <>
    <b>Total Score: {el.innings_one_runs}({el.first_innings_wicket})
    <br/>
    Extras: {el.innings_one_extra_runs}
    </b>
    </>
    )})}</center>


    <hr/>

    <center><h3>Innings 2</h3></center>

    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <h5>Batting: {el.first_bowling}</h5>
    )})}
    </center>
    

    <div class="container-fluid table-responsive py-5">
    <div class="table-resposive">
    <table className="table table-hover table-bordered table-striped">
    <thead className="thead-dark">
        <tr>
            <th scope="col">Batter</th>
            <th scope="col">Runs</th>
            <th scope="col">Fours</th>
            <th scope="col">Sixes</th>
            <th scope="col">Balls Faced</th>
        </tr>
    </thead>
    <tbody>
        {secondInningBat && secondInningBat.map(el => {return(
            <tr key = {el.player_id}>
            <td onClick={() => handlePlayerSelect(el.player_id)}><a href="">{el.player_name}</a></td>
            <td>{el.runs}</td>
            <td>{el.fours}</td>
            <td>{el.sixes}</td>
            <td>{el.balls_faced}</td>
            </tr>
        )
        })}
    </tbody>
  </table>
  </div>
  </div>



    <div class="container-fluid table-responsive py-5">
    <div class="table-resposive">
    <table className="table table-hover table-bordered table-striped">
    <thead className="thead-dark">
        <tr className="bg-primary">
            <th scope="col">Bowler</th>
            <th scope="col">Balls Bowled</th>
            <th scope="col">Runs Given</th>
            <th scope="col">Wickets</th>
        </tr>
    </thead>
    <tbody>
        {secondInningBowl && secondInningBowl.map(el => {return(
            <tr key = {el.bowler}>
            <td onClick={() => handlePlayerSelect(el.player_id)}><a href="">{el.player_name}</a></td>
            <td>{el.balls_bowled}</td>
            <td>{el.runs_given}</td>
            <td>{el.wickets}</td>
            </tr>
        )
        })}
    </tbody>
  </table>
  </div>
  </div>

    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <>
    <b>Total Score: {el.innings_two_runs}({el.second_innings_wicket})
    <br/>
    Extras: {el.innings_two_extra_runs}
    </b>
    </>
    )})}</center>

    
    <hr/>
    <center><h1>Match Information</h1></center>

    <div class="container-fluid table-responsive py-5">
    <div class="table-resposive">
    <table className="table table-hover table-bordered table-striped">
    <thead className="thead-dark">
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
  </div>
  </div>

</div>);
};

export default MatchStats;


