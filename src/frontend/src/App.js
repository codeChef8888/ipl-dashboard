import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TeamPage } from './pages/TeamPage';
import { MatchPage } from './pages/MatchPage';

function App() {
  return (
    <Router>
      <div className="App">


        <Switch>

          <Route path="/team/:teamName/matches/:year">
            <MatchPage />
          </Route>

          <Route path="/team/:teamName">
            <TeamPage />
          </Route>
          
        </Switch>

      </div>
    </Router>
  );
}

export default App;
