import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { MatchContext } from "../context/MatchContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const MatchStats = (props) => {
    const parameters = useParams();
    const history = useHistory();
    const { FirstBat, FirstBowl, SecondBat, SecondBowl, FirstBattingBowling, MatchInfo, Umpires, TeamOnePlayers, TeamTwoPlayers, InningOneOvers, InningTwoOvers } = useContext(MatchContext)
    const [firstInningBat, setFirstInningBat] = FirstBat;
    const [firstInningBowl, setFirstInningBowl] = FirstBowl;
    const [secondInningBat, setSecondInningBat] = SecondBat;
    const [secondInningBowl, setSecondInningBowl] = SecondBowl;
    const [firstBattingBowling, setFirstBattingBowling] = FirstBattingBowling;
    const [matchInfo, setMatchInfo] = MatchInfo;
    const [umpires, setUmpires] = Umpires;
    const [teamOnePlayers, setTeamOnePlayers] = TeamOnePlayers;
    const [teamTwoPlayers, setTeamTwoPlayers] = TeamTwoPlayers;
    const [inningOneOvers, setinningOneOvers] = InningOneOvers;
    const [inningTwoOvers, setinningTwoOvers] = InningTwoOvers;


    const ColoredLine = ({ color, height }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: height
        }}
    />
    );

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
                setinningOneOvers(response.data.data.inningOneOvers);
                setinningTwoOvers(response.data.data.inningTwoOvers)
            } 
            finally {
            }
        };
        fetchData();
    }, []);

    const handlePlayerSelect = (id) => {
        history.push(`/players/${id}`);
    }

  return (<div>
    <ColoredLine color="grey" height={0.5}/>

    <div class="container-fluid" style={{paddingLeft:50, paddingRight:50}}>

    <center><h1 style={{margin:20}}><b>Inning 1</b></h1></center>

    <div class="row">

    <div class="col">
    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <h5 style={{margin:10}}><b>Batting: {el.first_batting}</b></h5>
    )})}</center>

  <div class="container-fluid table-responsive py-3">
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
    
    <div class="col">
    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <h5 style={{margin:10}}><b>Bowling: {el.first_bowling}</b></h5>
    )})}</center>

    <div class="container-fluid table-responsive py-3">
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
    </div>

    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <><h3>
    <b>Total Score: {el.innings_one_runs}({el.first_innings_wicket})
    <br/>
    Extras: {el.innings_one_extra_runs}
    </b>
    </h3>
    </>
    )})}
    {inningOneOvers && inningOneOvers.map(el => {return(
    <><h3>
    <b>Overs: {el.over_id}.{el.ball_id}
    <br/>
    </b>
    </h3>
    </>
    )})}
    
    
    </center>    


    <ColoredLine color="grey" height={0.1}/>
    <center><h1 style={{margin:20}}><b>Inning 2</b></h1></center>

    <div class="row">
    <div class="col">
    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <h5><b>Batting: {el.first_bowling}</b></h5>
    )})}</center>


    <div class="container-fluid table-responsive py-3">
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
    
    <div class="col">
    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <h5 style={{margin:10}}><b>Bowling: {el.first_batting}</b></h5>
    )})}</center>

    <div class="container-fluid table-responsive py-3">
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

    </div>
    <center>{firstBattingBowling && firstBattingBowling.map(el => {return(
    <><h3>
    <b>Total Score: {el.innings_two_runs}({el.second_innings_wicket})
    <br/>
    Extras: {el.innings_two_extra_runs}
    </b>
    </h3>
    </>
    )})}
    
    {inningTwoOvers && inningTwoOvers.map(el => {return(
    <><h3>
    <b>Overs: {el.over_id}.{el.ball_id}
    <br/>
    </b>
    </h3>
    </>
    )})}
    </center>

    </div>

    <ColoredLine color="grey" height={0.1}/>


    <center><h1 style={{margin:40}}>Match Information</h1></center>

    <div class="container-fluid table-responsive" style={{paddingLeft:250, paddingRight:250}}>
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

    <ColoredLine color="grey" height={0.05}/>

</div>);
};

export default MatchStats;


