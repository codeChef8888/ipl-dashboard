import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { TeamPage } from './pages/TeamPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">

        <Route exact path="/team/:teamName">
          <TeamPage />
        </Route>

      </div>
    </Router>
  );
}

export default App;
