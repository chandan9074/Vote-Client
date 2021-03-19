import React, { Component } from 'react';
import './dashboardStyle.css';

import {
  Link
} from "react-router-dom";

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="aling_dash">
                <div className="private_style">
                    <Link to={{pathname:"/dashboard/privatepoll", state:{token:this.props.location.state.token}}}>
                        <button className="pri_btn">Private Poll</button>
                    </Link>
                </div>
                <div className="public_style">
                    <Link to={{pathname:"/dashboard/publicpoll", state:{token:this.props.location.state.token}}}>
                        <button className="pub_btn">Public Poll</button>
                    </Link>
                </div>
            </div>
         );
    }
}
 
export default Dashboard;