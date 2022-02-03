import React from 'react';
import MatchStats from '../components/MatchStats';
import ScoreComparison from '../components/ScoreComparison';
import Match_Summary_Stats from '../components/MatchSummaryStats';
// import PlayerInfo from '../components/PlayerInfo';
// import PlayerBattingStatistics from '../components/PlayerBattingStatistics';
// import PlayerBowlingStatistics from '../components/PlayerBowlingStatistics'; 
// import PlayerBattingGraphStatistics from '../components/PlayerBattingGraphStatistics'; 
// import PlayerBowlingGraphStatistics from '../components/PlayerBowlingGraphStatistics'; 


export const Match_info = () => {
  return (<div>
    <h2>Scoreboard</h2>
      <MatchStats />
    <h2>Score Comparison</h2>
      <ScoreComparison />
    <h2>Match Summary</h2>
      <Match_Summary_Stats />
    {/* <h2>
      Player Basic Information
    </h2>
      <PlayerInfo/>
      <h2>
      Player Batting statistics
    </h2>
      <PlayerBattingStatistics/>
      <PlayerBattingGraphStatistics/>
      <h2>
       Player Bowling statistics
    </h2>
      <PlayerBowlingStatistics/> */}
      {/* <PlayerBowlingGraphStatistics/> */}
  </div>);
};

export default Match_info;