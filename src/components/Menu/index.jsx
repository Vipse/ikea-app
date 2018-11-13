
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
        window.location = "/app/login"
    }
    render() {
        const isAuth = window.localStorage.getItem("userId") !== null;
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
                        <Antdmenu.Item key='/app/profile'>
                            <Link to='/app/profile'>Profile</Link>
                        </Antdmenu.Item>
                </Antdmenu>
                <div className="authTools">
                    {isAuth?<div>Name</div>:null}

                {isAuth?<Button type="danger" onClick={this.logOut}>Logout</Button>:
                <Button type="primary" onClick={this.logOut}><Link to='/app/login'>Login</Link></Button>}
                </div>
                </div>
                </div>
            </div>
                    )
    }
}

export default Menu;
