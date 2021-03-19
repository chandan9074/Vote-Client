import React, { Component } from 'react';
import './barStyle.css';
import arrow from './../pictures/arrow.png';
import Vote from './../pictures/Vote.png';

class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="navStyle">
                <img class="nav_vote" src={Vote} alt="Vote"/>
                <p className="nav_username_style">Hi, {this.props.username}</p>

                <div class="dropdown">
                    <img class="dropbtn" src={arrow} alt="dropdown"/>
                    <div class="dropdown-content">
                        <a href="/">Logout</a>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Navbar;