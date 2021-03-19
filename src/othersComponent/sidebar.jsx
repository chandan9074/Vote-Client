import React, { Component } from 'react';

import dashboard from './../pictures/dashboard.png';
import lock from './../pictures/lock.png';
import publics from './../pictures/public.png';
import report from './../pictures/report.png';
import vote_poll from './../pictures/vote_poll.png';
import create from './../pictures/create.png';


import {
  Link
} from "react-router-dom";

import './barStyle.css';

class Sidebar extends Component {
    state = { 
        public:{
            display:"block",
        },
        private:{
            display:"block",
        },
        public_result:{
            display:"block",
        },
        private_result:{
            display:"block"
        }

     }

    render() { 
        return ( 
            
                <div class="sidebar">
                    <p class="header">DASHBOARD</p>
                        <Link class="ul_a" to={{pathname:"/dashboard", state:{token:this.props.token}}}>
                            <img className="sideber_logo" src={dashboard} alt="dashboard"/> Dashboard
                        </Link >
                        <p class="header">MY POLLS</p>
                        <Link class="ul_a" onMouseOver={this.visiblePrivateoption} onMouseOut={this.invisiblePrivateoption} to={{pathname:"/dashboard/privatepoll", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={lock} alt="lock"/> Private Poll
                        </Link>
                        <Link class="ul_a" onMouseOver={this.visiblePublicoption} onMouseOut={this.invisiblePublicoption} to={{pathname:"/dashboard/publicpoll", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={publics} alt="publics"/> Public Poll
                        </Link>
                        <p class="header">CREATE POLLS</p>
                        <Link class="opiton_part_style"  onMouseOver={this.visiblePrivateoption} onMouseOut={this.invisiblePrivateoption} style={this.state.private} to={{pathname:"/dashboard/privatepoll/createprivatepoll", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={create} alt="create"/> Create Private Poll
                        </Link>
                        <Link class="opiton_part_style"  onMouseOver={this.visiblePublicoption} onMouseOut={this.invisiblePublicoption} style={this.state.public} to={{pathname:"/dashboard/publicpoll/createpublicpoll", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={create} alt="create"/> Create Public Poll
                        </Link>
                        <p class="header">VOTE</p>
                        <Link class="opiton_part_style" onMouseOver={this.visiblePrivateoption} onMouseOut={this.invisiblePrivateoption} style={this.state.private} to={{pathname:"/dashboard/publicpoll/checkprivatepassword", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={vote_poll} alt="vote_poll"/> Private Polls
                        </Link>
                        <Link class="opiton_part_style" onMouseOver={this.visiblePublicoption} onMouseOut={this.invisiblePublicoption} style={this.state.public} to={{pathname:"/dashboard/publicpoll/allpublicpoll", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={vote_poll} alt="vote_poll"/> Public Polls
                        </Link>
                        <p class="header">PRIVATE POLL RESULT</p>
                        <Link class="opiton_part_style"  onMouseOver={this.visiblePrivateResultoption} onMouseOut={this.invisiblePrivateResultoption} style={this.state.private_result} to={{pathname:"/dashboard/publicpoll/myprivatepollresult", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={report} alt="result"/> My Poll Results
                        </Link>
                        <Link class="opiton_part_style" onMouseOver={this.visiblePrivateResultoption} onMouseOut={this.invisiblePrivateResultoption} style={this.state.private_result} to={{pathname:"/dashboard/publicpoll/votedprivatepollresult", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={report} alt="result"/> Voted Results
                        </Link>
                        <p class="header">PUBLIC POLL RESULT</p>
                        <Link class="opiton_part_style"  onMouseOver={this.visiblePublicResultoption} onMouseOut={this.invisiblePublicResultoption} style={this.state.public_result} to={{pathname:"/dashboard/publicpoll/mypublicpollresult", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={report} alt="result"/> My Poll Results
                        </Link>
                        <Link class="opiton_part_style" onMouseOver={this.visiblePublicResultoption} onMouseOut={this.invisiblePublicResultoption} style={this.state.public_result} to={{pathname:"/dashboard/publicpoll/votedpublicpollresult", state:{token:this.props.token}}}>
                           <img className="sideber_logo" src={report} alt="result"/> Voted Results
                        </Link>
                </div>
         );
    }
}
 
export default Sidebar;