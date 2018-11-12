import React, { Component } from 'react';
import SearchTools from "../../components/SearchTools";
import './style.css'


class MaterialsMap extends Component {
  render() {
    return (
      <div className="MaterialsMap">
          <span className='title'>Materials Map</span>
          <SearchTools/>
      </div>
    );
  }
}

export default MaterialsMap;
