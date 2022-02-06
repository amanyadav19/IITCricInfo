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
    const { MatchSummary, ExtraRuns, MatchSummaryTwo, ExtraRunsTwo, InningOneBatter, InningTwoBatter, InningOneBowler, InningTwoBowler, Won, MatchInfo, AllOne } = useContext(MatchSummaryContext);
    const [ matchSummary, setMatchSummary] = MatchSummary
    const [ extraRuns, setExtraRuns] = ExtraRuns
    const [ matchSummaryTwo, setMatchSummaryTwo] = MatchSummaryTwo
    const [ extraRunsTwo, setExtraRunsTwo] = ExtraRunsTwo
    const [inningOneBatter, setInningOneBatter] = InningOneBatter;
    const [inningTwoBatter, setInningTwoBatter] = InningTwoBatter;
    const [inningOneBowler, setInningOneBowler] = InningOneBowler;
    const [inningTwoBowler, setInningTwoBowler] = InningTwoBowler;
    const [ won, setWon ] = Won
    const [ matchInfo, setMatchInfo ] = MatchInfo;
    const [ allOne, setAllOne ] = AllOne
    
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/match_summary/${parameters.id}`);
                setMatchSummary(response.data.data.summaryOne);
                setExtraRuns(response.data.data.extraRunsOne)
                setMatchSummaryTwo(response.data.data.summaryTwo);
                setExtraRunsTwo(response.data.data.extraRunsTwo);
                setInningOneBatter(response.data.data.inningOneBatter);
                setInningTwoBatter(response.data.data.inningTwoBatter);
                setInningOneBowler(response.data.data.inningOneBowler);
                setInningTwoBowler(response.data.data.inningTwoBowler);
                setWon(response.data.data.won);
                setMatchInfo(response.data.data.matchInfo);
                setAllOne(matchSummary.map(el => el.runtype));
                // matchSummary.push("extras");
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
  <h1>{matchInfo.map(el => el.first_batting)}</h1>
    <table className="table table-hover bg-primary">

    <thead>
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


    <table className="table table-hover bg-primary">

    <thead>
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
  
  <div class="w-50 container fluid" >
     <Pie
          data={{
            labels: {allOne},
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


  <h1>{matchInfo.map(el => el.first_bowling)}</h1>
    <table className="table table-hover bg-primary">

    <thead>
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


    <table className="table table-hover bg-primary">

    <thead>
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

  <div class="w-50 container fluid" >

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

            <h2>{won && won.map(el => {return(
            <>{el.won}</>
            )})}</h2>
</>
);
};

export default Match_Summary_Stats;