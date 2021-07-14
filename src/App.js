import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";

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
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
