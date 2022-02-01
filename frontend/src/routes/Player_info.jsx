import React from 'react';
import PlayerInfo from '../components/PlayerInfo';
import PlayerBattingStatistics from '../components/PlayerBattingStatistics';
import PlayerBowlingStatistics from '../components/PlayerBowlingStatistics'; 
import PlayerBattingGraphStatistics from '../components/PlayerBattingGraphStatistics'; 
import PlayerBowlingGraphStatistics from '../components/PlayerBowlingGraphStatistics'; 


export const Player_info = () => {
  return (<div>
    <h2>
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
      <PlayerBowlingStatistics/>
      <PlayerBowlingGraphStatistics/>
  </div>);
};

export default Player_info;