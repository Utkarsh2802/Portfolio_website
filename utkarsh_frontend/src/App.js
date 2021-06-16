import "./App.css";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TypingSpeedTest from "./Pages/TypingSpeedTest";
import HomePage from "./Pages/HomePage";
import pexel4 from "./Data/Images/pexel4.jpg";
function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/TypingSpeedTest"}>
          <TypingSpeedTest />
          <img src={pexel4} height="100%" width="100%" />
        </Route>
        <Route path={"/"}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
