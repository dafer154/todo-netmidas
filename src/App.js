import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import { Route, HashRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Chart from "./components/Chart/Chart";

class App extends Component {
  render() {
    return (
      <HashRouter basename='/'>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/chart" component={Chart} />
        </div>
      </HashRouter>
    );
  }

}

export default App;
