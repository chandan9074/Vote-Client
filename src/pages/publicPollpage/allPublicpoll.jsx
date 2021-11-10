import React, { Component } from 'react';
import axios from 'axios';

import Sidebar from './../../othersComponent/sidebar.jsx';
import Navbar from './../../othersComponent/navbar.jsx';
import empty_search from './../../pictures/empty_search.png';

import AllPublicPollOption from './allPublicpollOption.jsx';


class AllPublicPoll extends Component {
    state = { 
        public_polls:[],
     }

    componentDidMount(){
        var config={
        headers:{'Authorization':`Token ${this.props.location.state.token.token}`}
            }

        const fatch=()=>{

            axios.get('https://vote-bd.herokuapp.com/votes_api/public_poll_view/', config).then(res=>{
                this.setState({public_polls:res.data})
            })
        }
        fatch();
    }


    render() { 
        return ( 
            <div style={{backgroundColor:"", minHeight:"100vh", minWidth:"100vh"}}>
                <Navbar pageName="Public Polls" username={this.props.location.state.token.username} />
                <div className="publicpoll_flex_style">
                    <div className="fix_side">
                        <Sidebar token={this.props.location.state.token} />
                    </div>
                    <div className="publicpoll_style">
                        {this.state.public_polls.length===0?<div className="empty_div_style">
                        <img className="empty_img_style" src={empty_search} alt="empty"></img>
                    </div>:
                        <div>
                        {this.state.public_polls.map(poll=>(
                            <div className="poll_details">
                                <p className="details_style title_style">{poll.title}</p> <br/>
                                <p className="details_style des_style">{poll.description}</p>
                                <AllPublicPollOption poll_id={poll.id} hendlesave={this.handleSave} token={this.props.location.state.token} />
                            </div>
                        ))}</div>}                    
                    </div>
                </div>
            </div>
         );
    }
}
 
export default AllPublicPoll;