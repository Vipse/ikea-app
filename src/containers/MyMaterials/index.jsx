import React, { Component } from 'react';
import AddMaterial from "../../components/AddMaterial";
import './style.css'


class MyMaterials extends Component {
  render() {
    return (
      <div className="MyMaterials">
          <span className='title'>My Materials</span>
          <AddMaterial/>
      </div>
    );
  }
}

export default MyMaterials;
