import React, { Component } from 'react';

import Sidebar from './../../othersComponent/sidebar.jsx';
import Navbar from './../../othersComponent/navbar.jsx';
import empty_search from './../../pictures/empty_search.png';

import AllPrivatePollOption from './allPrivatepollOption.jsx';



class AllPrivatePoll extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{backgroundColor:"", minHeight:"100vh", minWidth:"100vh"}}>
                <Navbar pageName ="Private Polls" username={this.props.location.state.token.username} />
                <div className="privatepoll_flex_style">
                    <div className="fix_side">
                        <Sidebar token={this.props.location.state.token} />
                    </div>
                    <div className="privatepoll_style">
                        {this.props.location.state.private_polls.length===0?<div className="empty_div_style">
                        <img className="empty_img_style" src={empty_search} alt="empty"></img>
                    </div>:
                        <div>
                        {this.props.location.state.private_polls.map(poll=>(
                            <div className="poll_details">
                                <p className="details_style title_style">{poll.title}</p> <br/>
                                <p className="details_style des_style">{poll.description}</p>
                                <AllPrivatePollOption poll_id={poll.id} hendlesave={this.handleSave} token={this.props.location.state.token} />
                            </div>
                        ))}</div>}  
                    </div>
                </div>
            </div>
         );
    }
}
 
export default AllPrivatePoll;