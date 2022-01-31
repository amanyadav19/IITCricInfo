import React from 'react';
import PlayerInfo from '../components/PlayerInfo';
import PlayerBattingStatistics from '../components/PlayerBattingStatistics';
import PlayerBowlingStatistics from '../components/PlayerBowlingStatistics'; 

export const Player_info = () => {
  return (<div>
    <h2>
      Player Basic Information
    </h2>
      <PlayerInfo/>
      <h2>
      Player Batting statistics
    </h2>
      {/* <PlayerBattingStatistics/> */}
      <h2>
       Player Bowling statistics
    </h2>
      {/* <PlayerBowlingStatistics/> */}
  </div>);
};

export default Player_info;