import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home}/>
        <Route path="/cityList" component={CityList}/>
        <Route path="/map" component={Map}/>
      </div>
    </Router>
  );
}

export default App;
