import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { MatchSummaryContext } from "../context/MatchSummaryContext";
import { useParams } from "react-router-dom";
import {Pie} from 'react-chartjs-2';
import 'chart.js/auto';
import { useHistory } from "react-router-dom";

export const Match_Summary_Stats = (props) => {
    const parameters = useParams();
    const history = useHistory();
    const { MatchSummary, MatchSummaryTwo, InningOneBatter, InningTwoBatter, InningOneBowler, InningTwoBowler, Won, MatchInfo} = useContext(MatchSummaryContext);
    const [ matchSummary, setMatchSummary] = MatchSummary
    const [ matchSummaryTwo, setMatchSummaryTwo] = MatchSummaryTwo
    const [inningOneBatter, setInningOneBatter] = InningOneBatter;
    const [inningTwoBatter, setInningTwoBatter] = InningTwoBatter;
    const [inningOneBowler, setInningOneBowler] = InningOneBowler;
    const [inningTwoBowler, setInningTwoBowler] = InningTwoBowler;
    const [ won, setWon ] = Won
    const [ matchInfo, setMatchInfo ] = MatchInfo;

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/match_summary/${parameters.id}`);
                setMatchSummary(response.data.data.summaryOne);
                setMatchSummaryTwo(response.data.data.summaryTwo);
                setInningOneBatter(response.data.data.inningOneBatter);
                setInningTwoBatter(response.data.data.inningTwoBatter);
                setInningOneBowler(response.data.data.inningOneBowler);
                setInningTwoBowler(response.data.data.inningTwoBowler);
                setWon(response.data.data.won);
                setMatchInfo(response.data.data.matchInfo);
            } 
            finally {
            }
        };
        fetchData();
    }, []);

  const handlePlayerSelect = (id) => {
    history.push(`/players/${id}`); //////////// see this
  }


  return (
  <>
  <center><h1>Match Summary</h1></center>

  <div class="container">
  <div class="row">
  <div class="col">
  <center><h5>{matchInfo.map(el => el.first_batting)}</h5> </center>

  <div class="container-fluid table-responsive py-5">
    <table className="table table-hover table-bordered table-striped">
        <thead class="thead-dark">
        <tr className="bg-primary">
            <th scope="col">Batter</th>
            <th scope="col">Runs Scored</th>
            <th scope="col">Balls Played</th>
        </tr>
    </thead>
    <tbody>
        {inningOneBatter && inningOneBatter.map(el => {return(
            <tr key = {el.player_id} onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.player_name}</td>
            <td>{el.total_runs_scored}</td>
            <td>{el.balls_faced}</td>
            </tr>
        )
        })}
    </tbody>
  </table>
  </div>


    <div class="container-fluid table-responsive py-5">
    <table className="table table-hover table-bordered table-striped">
        <thead class="thead-dark">
        <tr className="bg-primary">
            <th scope="col">Bowler</th>
            <th scope="col">Wickets Taken</th>
            <th scope="col">Runs Given</th>
        </tr>
    </thead>
    <tbody>
        {inningTwoBowler && inningTwoBowler.map(el => {return(
            <tr key = {el.player_id} onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.player_name}</td>
            <td>{el.wickets_taken}</td>
            <td>{el.runs_given}</td>
            </tr>
        )
        })}
    </tbody>
  </table>
  </div>
  
  <div class="w-50 container-fluid table-responsive py-5" >
     <Pie
          data={{
            labels: matchSummary.map(el => el.runtype),
            datasets: [
              {
                label: 'Match Outline',
                backgroundColor: [
                  'rgb(255, 205, 86)',
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00',
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000'
                ],
                data: matchSummary.map(el => el.runscored)
              }
            ]
          }}
          options={{plugins:{
            title:{
              display:true,
              text:'Match Outline',
              fontSize:30
            },
            legend:{
              display:true,
              position:'right',
              fontSize:30
            }
          }}}
        />
  </div>
  </div> {/* col */}

  <div class="col">
  <center><h5>{matchInfo.map(el => el.first_bowling)}</h5> </center>

    <div class="container-fluid table-responsive py-5">
    <table className="table table-hover table-bordered table-striped">
        <thead class="thead-dark">
        <tr className="bg-primary">
            <th scope="col">Batter</th>
            <th scope="col">Runs Scored</th>
            <th scope="col">Balls Played</th>
        </tr>
    </thead>
    <tbody>
        {inningTwoBatter && inningTwoBatter.map(el => {return(
            <tr key = {el.player_id} onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.player_name}</td>
            <td>{el.total_runs_scored}</td>
            <td>{el.balls_faced}</td>
            </tr>
        )
        })}
    </tbody>
  </table>
  </div>

    <div class="container-fluid table-responsive py-5">
    <table className="table table-hover table-bordered table-striped">
        <thead class="thead-dark">
        <tr className="bg-primary">
            <th scope="col">Bowler</th>
            <th scope="col">Wickets Taken</th>
            <th scope="col">Runs Given</th>
        </tr>
    </thead>
    <tbody>
        {inningOneBowler && inningOneBowler.map(el => {return(
            <tr key = {el.player_id} onClick={() => handlePlayerSelect(el.player_id)}>
            <td>{el.player_name}</td>
            <td>{el.wickets_taken}</td>
            <td>{el.runs_given}</td>
            </tr>
        )
        })}
    </tbody>
  </table>
  </div>

  <div class="w-50 container-fluid table-responsive py-5" >
    <Pie
          data={{
            labels: matchSummaryTwo.map(el => el.runtype),
            datasets: [
              {
                label: 'Match Outline',
                backgroundColor: [
                  'rgb(255, 205, 86)',
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00',
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000'
                ],
                data: matchSummaryTwo.map(el => el.runscored)
              }
            ]
          }}
          options={{plugins:{
            title:{
              display:true,
              text:'Match Outline',
              fontSize:30
            },
            legend:{
              display:true,
              position:'right',
              fontSize:30
            }
          }}}
        />
    </div>
    </div>  {/* col */}
    </div>    {/* row */}
    </div>     {/* container */}
    <center><h5><b>{won.map(el => el.won)}</b></h5></center>

</>
);
};

export default Match_Summary_Stats;