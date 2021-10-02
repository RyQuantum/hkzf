import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {Button} from 'antd-mobile';

import Home from './pages/Home'
import CityList from './pages/CityList'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home}/>
        <Route path="/cityList" component={CityList}/>
      </div>
    </Router>
  );
}

export default App;
