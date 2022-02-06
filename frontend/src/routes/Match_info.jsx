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
    <center><h1 style={{margin:20, fontSize:70}}>Scoreboard</h1></center>
      <MatchStats />

  <div class="container-fluid py-5">

    <center>
    <button type="button" class="btn btn-primary" onClick={() => handleShowCompare()}>
      Score Comparison
    </button>
    -------
    <button type="button" class="btn btn-primary" onClick={() => handleMatchSummary()}>
      Match Summary
    </button>
    </center>
    <br/>
    { showScoreCompare ? <ScoreComparison /> : null }
    { showMatchSummary ? <Match_Summary_Stats /> : null }
    </div>
    <hr/>
  </div>);
};

export default Match_info;