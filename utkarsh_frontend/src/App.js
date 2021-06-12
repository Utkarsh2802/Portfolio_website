import "./App.css";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TypingSpeedTest from "./Pages/TypingSpeedTest";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/TypingSpeedTest"}>
          <TypingSpeedTest />
        </Route>
        <Route path={"/"}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
