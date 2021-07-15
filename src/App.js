import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducer";
import Home from "./pages/home";
import Quiz from "./pages/quiz";

function App() {
  const compose =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(reducer, compose);

  return (
    <Router>
      <Switch>
        <Provider store={store}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/quiz">
            <Quiz />
          </Route>
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
