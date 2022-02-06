import React, {useEffect, useContext} from "react";
import Path from "../apis/Path";
import { ScoreComparisonContext } from "../context/ScoreComparisonContext";
import { useParams } from "react-router-dom";
import { Line, } from "react-chartjs-2";


export const ScoreComparison = (props) => {
    const parameters = useParams();
    const { scoreComparison, scoreComparisonTwo, InningOneWickets, InningTwoWickets, FirstBattingBowling, Won } = useContext(ScoreComparisonContext);
    const [ firstInningRuns, setFirstInningRuns] = scoreComparison
    const [ secondInningRuns, setSecondInningRuns] = scoreComparisonTwo
    const [ inningOneWickets, setInningOneWickets ] = InningOneWickets
    const [ inningTwoWickets, setInningTwoWickets ] = InningTwoWickets
    const [ firstBattingBowling, setFirstBattingBowling] = FirstBattingBowling
    const [ won, setWon ] = Won

    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await Path.get(`/matches/score_comparison/${parameters.id}`);
                setFirstInningRuns(response.data.data.inningOne);
                setSecondInningRuns(response.data.data.inningTwo);
                setInningOneWickets(response.data.data.inningOneWickets);
                setInningTwoWickets(response.data.data.inningTwoWickets);
                setFirstBattingBowling(response.data.data.firstBattingBowling);
                setWon(response.data.data.won);
            } 
            finally {
            }
        };
        fetchData();
    }, []);
  return (
    <>
  <div class="container-fluid py-5">

    <center><h1>Score Comparison</h1></center>

  <div class="container-fluid py-5">

        <Line
        data={{
            labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            datasets: [
            {
                label: firstBattingBowling.map(el => el.first_batting),
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                data: firstInningRuns.map(el => el.total_score),
                pointRadius: inningOneWickets.map(el => el.dotradius),
            },
            {
                label: firstBattingBowling.map(el => el.first_bowling),
                backgroundColor: 'rgb(255,0,0)',
                borderColor: 'rgb(255,0,0)',
                borderWidth: 2,
                data: secondInningRuns.map(el => el.total_score),
                pointRadius: inningTwoWickets.map(el => el.dotradius),
            }
            ]
        }}
        options={{
            plugins:{
                title:{
                display:true,
                text:'Runs',
                fontSize:20
                },
                
                legend:{
                display:true,
                position:'right'
                }
            },            
        }}
        />
    </div>
    <center><h5><b>{won.map(el => el.won)}</b></h5></center>
    </div>
  </>
  );
};

export default ScoreComparison;


