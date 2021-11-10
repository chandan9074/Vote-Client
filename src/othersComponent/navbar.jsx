import React, { Component } from 'react';
import './barStyle.css';
import arrow from './../pictures/arrow.png';
import Vote from './../pictures/Vote.png';

import {
  Link
} from "react-router-dom";

class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="navStyle">
                <p className="page-title">{this.props.pageName}</p>
                <img class="nav_vote" src={Vote} alt="Vote"/>
                <div className="nav-btn-align">
                    <p className="nav_username_style">Hi, {this.props.username}</p>
                    <Link className="logout-btn" to="/login"><span>Logout</span></Link>   
                </div>
            </div>
         );
    }
}
 
export default Navbar;