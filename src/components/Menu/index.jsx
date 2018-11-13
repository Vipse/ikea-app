
import React, { Component } from 'react';
import { Menu as Antdmenu, Icon, Button } from 'antd';
import { Link } from "react-router-dom";
import './style.css'



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
    logOut = () => {
        window.localStorage.clear();
    }
    render() {
        const isAuth = window.localStorage.getItem("userId") !== null;
        const userName = window.localStorage.getItem("userName");
        return (
            <div className='headerMenu'>
            <div className="container">
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
                </Antdmenu>
                <div className='rightNav'>
                <Antdmenu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                style={{display:"flex", justifyContent:"center"}}
                >
                        <Antdmenu.Item key='/app/my-materials'>
                            <Link to='/app/my-materials'>My materials</Link>
                        </Antdmenu.Item>
                        {/* <Antdmenu.Item key='/app/profile'>
                            <Link to='/app/profile'>Profile</Link>
                        </Antdmenu.Item> */}
                </Antdmenu>
                <div className="authTools">
                    {isAuth?<div className='userName'>{userName}</div>:null}

                {isAuth?<Link to='/app/login'><Button type="danger" onClick={this.logOut}>Sign Out</Button></Link>:
                <Link to='/app/login'><Button type="primary">Sign In</Button></Link>}
                </div>
                </div>
                </div>
            </div>
                    )
    }
}

export default Menu;
