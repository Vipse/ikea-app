
import React, { Component } from 'react';
import { Menu as Antdmenu, Icon } from 'antd';
import { Link } from "react-router-dom";



class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { current: window.location.pathname }
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
    
        return (
            <Antdmenu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{display:"flex", justifyContent:"center"}}
            >
                
                <Antdmenu.Item key='/app/search-materials'>
                    <Link to='/app/search-materials'>Search materials</Link>
                </Antdmenu.Item>
                
                <Antdmenu.Item key='/app/materials-map'>
                    <Link to='/app/materials-map'>Materials map</Link>
                </Antdmenu.Item>
                <Antdmenu.Item key='/app/my-materials'>
                    <Link to='/app/my-materials'>My materials</Link>
                </Antdmenu.Item>
                <Antdmenu.Item key='/app/profile'>
                    <Link to='/app/profile'>Profile</Link>
                </Antdmenu.Item>

            </Antdmenu>
        );
    }
}

export default Menu;
