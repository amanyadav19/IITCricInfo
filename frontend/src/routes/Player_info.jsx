import React from 'react';
import PlayerInfo from '../components/PlayerInfo';
import PlayerBattingStatistics from '../components/PlayerBattingStatistics';
import PlayerBowlingStatistics from '../components/PlayerBowlingStatistics'; 
import PlayerBattingGraphStatistics from '../components/PlayerBattingGraphStatistics'; 
import PlayerBowlingGraphStatistics from '../components/PlayerBowlingGraphStatistics'; 


export const Player_info = () => {
  return (<div>
    <br></br>
    <center><h3>
      Player Basic Information
    </h3>
    </center>
      <PlayerInfo/>
      <br></br>
      <center><h3>
            Player Batting Statistics
            </h3>
            </center>
      <div class="container">
        <div class="row">
          <div class="col-sm">
          <PlayerBattingStatistics/>
          </div>
          <div class="col-sm">
          <PlayerBattingGraphStatistics/>
          </div>
        </div>
      </div>
      <br></br>
      <center><h3>
            Player Bowling Statistics
            </h3>
            </center>
      <PlayerBowlingStatistics/>
      <div width="30%" >
      <PlayerBowlingGraphStatistics/>
      </div>
  </div>);
};

export default Player_info;