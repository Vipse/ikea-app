import React, { Component } from 'react';
import './App.css';
import {store} from './store'
import SearchMaterials from '../src/containers/SearchMaterials';
import MaterialsMap from '../src/containers/MaterialsMap';
import MyMaterials from '../src/containers/MyMaterials';
import Profile from '../src/containers/Profile';
import Menu from '../src/components/Menu';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Provider} from 'react-redux'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {current: 'search-materials'}
}
handleClick = (e) => {
  console.log('click ', e);
  this.setState({
    current: e.key,
  });
}
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Menu/>
            
            <Route path="/app/search-materials" component={SearchMaterials}/>
            <Route path="/app/materials-map" component={MaterialsMap}/>
            <Route path="/app/my-materials" component={MyMaterials}/>
            <Route path="/app/profile" component={Profile}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
