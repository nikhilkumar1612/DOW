import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import homepage from './homepage';
import sell from './sell';
import buy from './buy';
import inspect from './inspect';
import owner from './owner';
import stop from './stop';
import bid from './bid';
import pending from './pending'

function App() {
  return (
    <div className="container">
    <div className="outer">
    <div className="App">
      <div className="wrapper">
      <h1>DEALS ON WHEELS</h1>

      <Router>
            <Switch>
              <Route path="/" exact component={homepage}/>
              <Route path="/sell" exact component={sell}/>
              <Route path="/buy" exact component={buy}/>
              <Route path="/inspect" exact component={inspect}/>
              <Route path="/owner" exact component={owner}/>
              <Route path="/stop" exact component={stop}/>
              <Route path="/bid" exact component={bid}/>
              <Route path="/pending" exact component={pending}/>
            </Switch>
      </Router>
      </div>

      <div className="Footer">
        <p>email@email.com | +91 8197351383 |
            <a href="https://rinkeby.etherscan.io/address/0xc2b50d75b07257d53fdf8f9f3968c96fce5cb910" class="fa fa-facebook"></a>
            <a href="https://instagram.com/dealsonwheels.blr?igshid=2cly268tim0c" class="fa fa-instagram"></a>
            <a href="https://youtube.com/channel/UCnEJBMBhM-2teFg71ULbC3w" class="fa fa-youtube"></a>
            <a href="https://chat.whatsapp.com/DWdSJdRA15WKBp9xsmfVwG" class="fa fa-whatsapp"></a>
        </p>
      </div>
    </div>
    </div>
    </div>
  );
}

export default App;
