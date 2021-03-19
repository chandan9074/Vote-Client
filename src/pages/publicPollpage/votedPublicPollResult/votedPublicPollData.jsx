import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './../../../othersComponent/navbar.jsx';
import Sidebar from './../../../othersComponent/sidebar.jsx';
import './../publicpollStyle.css'

import VotedPublicPollFinalData from './votedPublicPollFinalData.jsx';

class VotedPublicPollData extends Component {
    state = { 
        public_polls_result_details:[],
     }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.location.state.token.token}`}
            }
        var id = this.props.location.state.token.user_id

        const fatch=()=>{

            axios.get(`http://127.0.0.1:8000/votes_api/public_poll_result_by_user/${id}/`, config).then(res=>{
                var result = JSON.parse(JSON.stringify(res.data))
                this.setState({public_polls_result_details:result})
            })
        }
        fatch();
     }

    render() { 
        return ( 
            <div style={{backgroundColor:"rgb(90, 157, 224)", minHeight:"100vh", minWidth:"100vh"}}>
                <Navbar username={this.props.location.state.token.username} />
                <div className="publicpoll_flex_style">
                    <div className="fix_side">
                        <Sidebar token={this.props.location.state.token} />
                    </div>
                    <div className="publicpoll_style">
                        <table className="table_style">
                            <tr>
                                <th className="border_style th_name_style left_radius_style">Poll Name</th>
                                <th className="border_style th_option_style right_radius_style">Selected Option</th>
                            </tr>                           
                            {this.state.public_polls_result_details.map((details, index)=>(
                                <VotedPublicPollFinalData publicpoll={details.publicpoll} publicpoll_option={details.publicpoll_option} token={this.props.location.state.token.token} />
                            ))}
                        </table>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default VotedPublicPollData;