import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './../../../othersComponent/navbar.jsx';
import Sidebar from './../../../othersComponent/sidebar.jsx';
import './../publicpollStyle.css'
import empty_search from './../../../pictures/empty_search.png';

import CollectPublicPollResultData from './collectPerPublicPollResultData.jsx'

class CollectPublicPollsData extends Component {
    state = { 
        public_polls_details:[],
     }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.location.state.token.token}`}
            }
        var id = this.props.location.state.token.user_id

        const fatch=()=>{

            axios.get(`https://vote-bd.herokuapp.com/votes_api/user_public_poll_view/${id}/`, config).then(res=>{
                var result = JSON.parse(JSON.stringify(res.data))
                this.setState({public_polls_details:result})
            })
        }
        fatch();
     }


    render() { 
        return ( 
            <div style={{backgroundColor:"", minHeight:"100vh", minWidth:"100vh"}}>
                <Navbar pageName="My public Polls result" username={this.props.location.state.token.username} />
                <div className="publicpoll_flex_style">
                    <div className="fix_side">
                        <Sidebar token={this.props.location.state.token} />
                    </div>
                    <div className="publicpoll_style">

                        {this.state.public_polls_details.length===0?<div className="empty_div_style">
                        <img className="empty_img_style" src={empty_search} alt="empty"></img>
                        </div>:<div>
                        {this.state.public_polls_details.map((details, index)=>(
                            <CollectPublicPollResultData poll_title={details.title} poll_id={details.id} token={this.props.location.state.token.token} />
                        ))}
                        </div>
                        }
                    </div>
                </div>
            </div>
         );
    }
}
 
export default CollectPublicPollsData;