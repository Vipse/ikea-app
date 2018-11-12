import React, { Component } from 'react';
import './App.css';
import {store} from './store'
import { Menu, Icon } from 'antd';
import Login from '../src/containers/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Provider} from 'react-redux'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
}
  render() {
    return (
      <div>
      <Provider store={store}>app
        <Router>
          <div>
            <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            >
              <Menu.Item key="mail">
                <Icon type="mail" />Navigation One
              </Menu.Item>

              <Menu.Item key="alipay">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
              </Menu.Item>
            </Menu>
            <Route path="/app" component={App}/>
            <Route path="/search-materials" component={Login}/>
            <Route path="/map-materials" component={Login}/>
            <Route path="/my-materials" component={Login}/>
            <Route path="/profile" component={Login}/>
          </div>
        </Router>
      </Provider>
      </div>
    );
  }
}

export default App;
