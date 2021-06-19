import "./App.css";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TypingSpeedTest from "./Pages/TypingSpeedTest";
import HomePage from "./Pages/HomePage";
import Nav_bar from "./Components/Nav_bar";
import LoginPage from "./Pages/LoginPage";
function App() {
  return (
    <Router>
      <Nav_bar></Nav_bar>
      <Switch>
        <Route path={"/Login"}>
          <LoginPage />
        </Route>

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
