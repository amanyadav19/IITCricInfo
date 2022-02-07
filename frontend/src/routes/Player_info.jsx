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
    <div class="container">
      <PlayerInfo/>
      </div>
      <br></br>
      <center><h3>
            Player Batting Statistics
            </h3>
            </center>
      <div class="container">
        <div class="row container">
          <div class="col">
          <PlayerBattingStatistics/>
          </div>
          <div class="col">
          <PlayerBattingGraphStatistics/>
          </div>
        </div>
      </div>
      <br></br>
      <center><h3>
            Player Bowling Statistics
            </h3>
            </center>
      <div class="container">
      <PlayerBowlingStatistics/>
      </div>
      <div width="30%" class="container">
      <PlayerBowlingGraphStatistics/>
      </div>
  </div>);
};

export default Player_info;