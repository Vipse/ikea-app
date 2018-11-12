import React, { Component } from 'react';
import './App.css';
import SearchMaterials from '../src/containers/SearchMaterials';
import MaterialsMap from '../src/containers/MaterialsMap';
import MyMaterials from '../src/containers/MyMaterials';
import Profile from '../src/containers/Profile';
import Menu from '../src/components/Menu';
import { BrowserRouter as Router, Route } from "react-router-dom";
class App extends Component {

  render() {

    return (
        <Router>
          <div>
            <Menu/>
            <Route path="/app/search-materials" component={SearchMaterials}/>
            <Route path="/app/materials-map" component={MaterialsMap}/>
            <Route path="/app/my-materials" component={MyMaterials}/>
            <Route path="/app/profile" component={Profile}/>
          </div>
        </Router>
    );
  }
}

export default App;
