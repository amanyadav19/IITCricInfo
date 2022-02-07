import React, {useState} from 'react';
import MatchStats from '../components/MatchStats';
import ScoreComparison from '../components/ScoreComparison';
import Match_Summary_Stats from '../components/MatchSummaryStats';

export const Match_info = () => {
  const [ showScoreCompare, setShowScoreCompare ] = useState(false);
  const [ showMatchSummary, setShowMatchSummary ] = useState(false);
  
  const handleShowCompare = () => {
    setShowMatchSummary(false);
    setShowScoreCompare(true);
  }

  const handleMatchSummary = () => {
    setShowScoreCompare(false);
    setShowMatchSummary(true);
  }

  return (<div>

    <center><h1 style={{margin:20, fontSize:70}}>Scorecard</h1></center>
      <MatchStats />


  <div class="container-fluid py-5">

  <div class="container w-25">
    <center>
    <div class="row">
    <div class="col" style={{margin:10}}>
    <button type="button" class="btn btn-primary btn-lg" onClick={() => handleShowCompare()}>
      Score Comparison
    </button>
    </div>
    <div class="col" style={{margin:10}}>
    <button type="button" class="btn btn-primary btn-lg" onClick={() => handleMatchSummary()}>
      Match Summary
    </button>
    </div>
    </div>
    </center>
  </div>

    { showScoreCompare ? <ScoreComparison /> : null }
    { showMatchSummary ? <Match_Summary_Stats /> : null }
    </div>
    <hr/>
  </div>);
};

export default Match_info;