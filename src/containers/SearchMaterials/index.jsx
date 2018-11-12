import React, { Component } from 'react';
import './style.css'
import SearchTools from "../../components/SearchTools";

class SearchMaterials extends Component {
  render() {
    return (
      <div className="SearchMaterials">
        <span className='title'>Search Materials</span>
        <SearchTools list={true}/>
      </div>
    );
  }
}

export default SearchMaterials;
