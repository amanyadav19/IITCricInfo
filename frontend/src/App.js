import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Venues from './routes/Venues';
import Venue_stats from './routes/Venue_stats';
import Create_venue from './routes/Create_venue';
import { VenuesContextProvider } from './context/VenuesContext';

function App() {
  return (
    <VenuesContextProvider>
    <div className='container'>
    <head>
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
      </head>
      <Router>
        <Switch>
          <Route exact path="/venues" component={Venues}/>
          <Route exact path="/venue/:id" component={Venue_stats}/>
          <Route exact path="/create_venue" component={Create_venue}/>
        </Switch>
      </Router>
    </div>
    </VenuesContextProvider>
  );
}

export default App;