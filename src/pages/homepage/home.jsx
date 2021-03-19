import React, { Component } from 'react';
import vote_home from './../../pictures/vote_home.png';

import {
  Link
} from "react-router-dom";

import './homeStyle.css';
import homepage from './../../pictures/homepage.png';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="home_style" style={{backgroundImage:`url(${homepage})`, backgroundSize:"cover"}}>
                <div >
                    <img className="home_img_caption" style={{width:"35vh", height:"25vh"}} src={vote_home} alt="vote_home"/>
                    <p className="home_page_caption">CREATE YOUR OWN OPINION</p>
                </div>
                <div className="btns_style">
                        <Link to="/login">
                        <button className="btn_style log_pad">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn_style sin_pad">Signup</button>
                        </Link>
                </div>
            </div>
         );
    }
}
 
export default Home;