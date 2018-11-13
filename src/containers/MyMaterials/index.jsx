import React, { Component } from 'react';
import AddMaterial from "../../components/AddMaterial";
import {Link} from "react-router-dom"
import './style.css'


class MyMaterials extends Component {
  render() {
    const isAuth = window.localStorage.getItem("userId") !==null
    return (
      <div className="MyMaterials">
          <span className='title'>My Materials</span>
          {isAuth?<AddMaterial/>:
            <div>
              <span className='title'>You are not authorized</span><br/>
              <Link to="/app/login">Login</Link>
            </div>
          }
      </div>
    );
  }
}

export default MyMaterials;
